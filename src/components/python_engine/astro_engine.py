import sys
sys.stdout.reconfigure(encoding='utf-8')

import json
import math
import re
from datetime import datetime, timedelta
import ephem

# 1. அடிப்படை ராசிகள் மற்றும் அதிபதிகள்
SIGNS = [
    "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி",
    "துலாம்", "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
]

SIGN_LORDS = {
    "மேஷம்": "செவ்வாய்", "ரிஷபம்": "சுக்கிரன்", "மிதுனம்": "புதன்", "கடகம்": "சந்திரன்",
    "சிம்மம்": "சூரியன்", "கன்னி": "புதன்", "துலாம்": "சுக்கிரன்", "விருச்சிகம்": "செவ்வாய்",
    "தனுசு": "குரு", "மகரம்": "சனி", "கும்பம்": "சனி", "மீனம்": "குரு"
}

SIGN_GENDERS = {
    "மேஷம்": "ஆண்", "ரிஷபம்": "பெண்", "மிதுனம்": "ஆண்", "கடகம்": "பெண்",
    "சிம்மம்": "ஆண்", "கன்னி": "பெண்", "துலாம்": "ஆண்", "விருச்சிகம்": "பெண்",
    "தனுசு": "ஆண்", "மகரம்": "பெண்", "கும்பம்": "ஆண்", "மீனம்": "பெண்"
}

PLANET_EPHEM_MAP = {
    "சூரியன்": ephem.Sun(),
    "சந்திரன்": ephem.Moon(),
    "செவ்வாய்": ephem.Mars(),
    "புதன்": ephem.Mercury(),
    "குரு": ephem.Jupiter(),
    "சுக்கிரன்": ephem.Venus(),
    "சனி": ephem.Saturn()
}

PLANET_RULES = {
    "சூரியன்": {"day": "ஞாயிறு", "deity": "சிவபெருமான்", "remedy": "கோதுமை தானம்", "uccham": "மேஷம்", "neecham": "துலாம்", "friends": ["சந்திரன்", "செவ்வாய்", "குரு"]},
    "சந்திரன்": {"day": "திங்கள்", "deity": "பார்வதி தேவி", "remedy": "பச்சரிசி / பால் தானம்", "uccham": "ரிஷபம்", "neecham": "விருச்சிகம்", "friends": ["சூரியன்", "புதன்"]},
    "செவ்வாய்": {"day": "செவ்வாய்", "deity": "முருகப்பெருமான்", "remedy": "துவரம் பருப்பு தானம்", "uccham": "மகரம்", "neecham": "கடகம்", "friends": ["சூரியன்", "சந்திரன்", "குரு"]},
    "புதன்": {"day": "புதன்", "deity": "மகாவிஷ்ணு", "remedy": "பாசிப்பயறு தானம்", "uccham": "கன்னி", "neecham": "மீனம்", "friends": ["சூரியன்", "சுக்கிரன்"]},
    "குரு": {"day": "வியாழன்", "deity": "தட்சிணாமூர்த்தி", "remedy": "கொண்டைக்கடலை தானம்", "uccham": "கடகம்", "neecham": "மகரம்", "friends": ["சூரியன்", "சந்திரன்", "செவ்வாய்"]},
    "சுக்கிரன்": {"day": "வெள்ளி", "deity": "மகாலட்சுமி தாயார்", "remedy": "மொச்சை தானம்", "uccham": "மீனம்", "neecham": "கன்னி", "friends": ["புதன்", "சனி"]},
    "சனி": {"day": "சனி", "deity": "சனீஸ்வரர் / பைரவர்", "remedy": "எள் தானம் & நல்லெண்ணெய் தீபம்", "uccham": "துலாம்", "neecham": "மேஷம்", "friends": ["புதன்", "சுக்கிரன்"]},
    "ராகு": {"day": "செவ்வாய் / வெள்ளி", "deity": "துர்க்கை அம்மன்", "remedy": "உளுந்து தானம்", "uccham": "ரிஷபம்", "neecham": "விருச்சிகம்", "friends": ["சுக்கிரன்", "சனி"]},
    "கேது": {"day": "செவ்வாய்", "deity": "விநாயகர்", "remedy": "கொள்ளு தானம்", "uccham": "விருச்சிகம்", "neecham": "ரிஷபம்", "friends": ["சூரியன்", "செவ்வாய்"]}
}

def get_ayanamsa(dt):
    t = (dt.year - 2000) + (dt.month - 1) / 12.0 + dt.day / 365.25
    return 23.85 + (t * 0.01397)

def get_planet_sidereal_info(planet_obj, dt):
    planet_obj.compute(dt.strftime('%Y/%m/%d %H:%M:%S'))
    tropical_deg = math.degrees(planet_obj.hlon if hasattr(planet_obj, 'hlon') else planet_obj.ra) % 360
    sidereal_deg = (tropical_deg - get_ayanamsa(dt)) % 360
    sign_idx = int(sidereal_deg // 30)
    deg_in_sign = sidereal_deg % 30
    return SIGNS[sign_idx], deg_in_sign

def get_continuous_ranges(planet_obj, start_dt, days=365):
    ranges = []
    curr_sign, _ = get_planet_sidereal_info(planet_obj, start_dt)
    r_start = start_dt
    for d in range(1, days + 1):
        dt = start_dt + timedelta(days=d)
        s, _ = get_planet_sidereal_info(planet_obj, dt)
        if s != curr_sign:
            ranges.append({"sign": curr_sign, "start": r_start.strftime("%d-%m-%Y"), "end": (dt - timedelta(days=1)).strftime("%d-%m-%Y")})
            curr_sign = s
            r_start = dt
    ranges.append({"sign": curr_sign, "start": r_start.strftime("%d-%m-%Y"), "end": (start_dt + timedelta(days=days)).strftime("%d-%m-%Y")})
    return ranges

def calculate_current_dasa(dob_str, balance_str):
    try:
        dasa_order = ["கேது", "சுக்கிரன்", "சூரியன்", "சந்திரன்", "செவ்வாய்", "ராகு", "குரு", "சனி", "புதன்"]
        dasa_years = {"கேது": 7, "சுக்கிரன்": 20, "சூரியன்": 6, "சந்திரன்": 10, "செவ்வாய்": 7, "ராகு": 18, "குரு": 16, "சனி": 19, "புதன்": 17}
        dob_dt = datetime.strptime(dob_str.strip(), "%Y-%m-%d")
        now_dt = datetime.now()
        age_years = (now_dt - dob_dt).days / 365.25
        
        m = re.search(r'([^\d]+)\s*(\d+)', balance_str)
        if not m:
            return "சுக்கிரன்", now_dt.year, now_dt.year + 5
        b_lord = m.group(1).strip()
        b_rem = float(m.group(2))
        
        start_lord = next((k for k in dasa_order if k in b_lord), "சுக்கிரன்")
        idx = dasa_order.index(start_lord)
        
        elapsed = 0
        curr_span = b_rem
        while elapsed + curr_span < age_years:
            elapsed += curr_span
            idx = (idx + 1) % len(dasa_order)
            curr_span = dasa_years[dasa_order[idx]]
        
        c_lord = dasa_order[idx]
        s_yr = int(dob_dt.year + elapsed)
        e_yr = int(s_yr + curr_span)
        return c_lord, s_yr, e_yr
    except Exception:
        return None, None, None

def main():
    if len(sys.argv) < 2:
        return
    payload = json.loads(sys.argv[1])

    user_name = payload.get("name", "அன்பர்").strip()
    lagnam = payload.get("lagnam", "").strip()
    rasi = payload.get("rasi", "").strip()
    dob_str = payload.get("dob", "").strip()
    balance_str = payload.get("dasa_balance", "").strip()
    question = payload.get("question", "").strip()
    selected_bhava = payload.get("selectedBhava")

    if not lagnam or lagnam not in SIGNS:
        print(json.dumps({"reply": "லக்ன விவரங்கள் கிடைக்கவில்லை. தயவுசெய்து மீண்டும் உள்ளிடவும்."}, ensure_ascii=False))
        return

    if not question:
        print(json.dumps({"reply": "தயவுசெய்து நீங்கள் அறிய விரும்பும் கேள்வியை உள்ளிடவும்."}, ensure_ascii=False))
        return

    lagna_idx = SIGNS.index(lagnam)
    curr_dasa_lord, dasa_s_yr, dasa_e_yr = calculate_current_dasa(dob_str, balance_str)

    q = question.lower()
    q_lower = q

    # 4. ஆழமான வினா வகைப்பாடு (Domain Detection)
    if selected_bhava and int(selected_bhava) in range(1, 13):
        bhava_num = int(selected_bhava)
        category_map = {
            2: "தன ஸ்தானம் (பண வரவு)",
            4: "சுக ஸ்தானம் (சொத்து / பூமி / வாகனம்)",
            5: "புத்திர பாக்கியம் மற்றும் பூர்வ புண்ணியம்",
            6: "ரண ரோக சத்ரு நிவர்த்தி (கடன், உடல்நலம்)",
            7: "திருமணம் / களத்திர யோகம்",
            9: "பாக்கிய ஸ்தானம் மற்றும் தூரதேசப் பயணம்",
            10: "ஜீவன ஸ்தானம் (தொழில் / வேலை)"
        }
        category = category_map.get(bhava_num, "பொதுவான நற்பலன்கள்")
        karaka_map = {2: "குரு", 4: "செவ்வாய்", 5: "குரு", 6: "சனி", 7: "சுக்கிரன்", 9: "ராகு", 10: "சூரியன்"}
        karaka = karaka_map.get(bhava_num, "குரு")
    elif any(k in q_lower for k in ["குழந்தை", "புத்திர", "கருத்தரி", "வாரிசு", "child", "baby", "kuzhandhai", "pudhir"]):
        bhava_num = 5
        category = "புத்திர பாக்கியம் மற்றும் பூர்வ புண்ணியம்"
        karaka = "குரு"
    elif any(k in q_lower for k in ["திருமண", "கல்யாண", "வரன்", "களத்திர", "பொருத்தம்", "marriage", "wedding", "thirumana"]):
        bhava_num = 7
        category = "திருமணம் / களத்திர யோகம்"
        karaka = "சுக்கிரன்"
    elif any(k in q_lower for k in ["வீடு", "மனை", "சொத்து", "நிலம்", "வாகன", "land", "house", "property", "veedu"]):
        bhava_num = 4
        category = "சொத்து / பூமி / வாகன யோகம்"
        karaka = "செவ்வாய்"
    elif any(k in q_lower for k in ["கடன்", "நோய்", "மருத்துவ", "வழக்கு", "debt", "loan", "health", "kadan"]):
        bhava_num = 6
        category = "ரண ரோக சத்ரு நிவர்த்தி (கடன், உடல்நலம்)"
        karaka = "சனி"
    elif any(k in q_lower for k in ["பணம்", "வரவு", "நிதி", "சேமிப்பு", "வருமான", "money", "wealth", "finance", "panam"]):
        bhava_num = 2
        category = "தன ஸ்தானம் மற்றும் நிதி ஆதாயம்"
        karaka = "குரு"
    elif any(k in q_lower for k in ["வெளிநாடு", "பயணம்", "விசா", "foreign", "travel", "visa", "velinaadu"]):
        bhava_num = 9
        category = "பாக்கிய ஸ்தானம் மற்றும் தூரதேசப் பயணம்"
        karaka = "ராகு"
    else:
        bhava_num = 1
        category = "லக்ன பாவம் (பொதுவான நற்பலன்கள் & சுய முன்னேற்றம்)"
        karaka = "சூரியன்"

    target_sign = SIGNS[(lagna_idx + bhava_num - 1) % 12]
    target_lord = SIGN_LORDS[target_sign]
    target_gender = SIGN_GENDERS[target_sign]
    dusthana8 = SIGNS[(lagna_idx + 8 - 1) % 12]
    dusthana12 = SIGNS[(lagna_idx + 12 - 1) % 12]
    lord_meta = PLANET_RULES.get(target_lord, {"day": "வியாழன்", "deity": "இறைவன்", "remedy": "தான தர்மங்கள்"})

    # 5. வினாவின் நோக்கத்திற்குரிய நேரடி சாஸ்திரத் தீர்ப்பு
    is_asking_count = any(k in q for k in ["எத்தனை", "எத்தன", "how many", "count", "ethanai", "ethana"])
    is_asking_timing = any(k in q for k in ["எப்போது", "எப்பொழுது", "காலம்", "when", "time", "eppo", "eppothu"])
    is_asking_yes_no = any(k in q for k in ["உண்டா", "வருமா", "கிடைக்குமா", "சாத்தியமா", "is there", "will"])

    direct_verdict = []
    if bhava_num == 5:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்கு 5-ஆம் வீடான புத்திர ஸ்தானம் '{target_sign}' ராசியாக அமைகிறது. இதன் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append(f"* புத்திர ஸ்தானம் {target_gender} ராசியாக அமைவதாலும், புத்திர காரகனான குருவின் இயற்கை சுபத்துவத்தாலும் உங்கள் ஜாதகத்தில் தீர்க்கமான குழந்தைப் பாக்கிய யோகம் உறுதியாக உள்ளது.")
        if is_asking_count:
            count_res = "இரட்டைப் படை (பெண்) ராசி பலம் பெற்று அமைவதால் இயல்பாகவே 2 குழந்தைகள் அமைய சாஸ்திர விதிகளின்படி அதிக சாத்தியக்கூறுகள் உள்ளன." if target_gender == "பெண்" else "ஒற்றைப் படை (ஆண்) ராசியாக அமைவதால் ஆண் வாரிசுக்கான அனுகூலத்துடன் கூடிய புத்திர பாக்கியம் அமையும்."
            direct_verdict.append(f"* குழந்தைகளின் எண்ணிக்கை விபரம்: {count_res}")
        if is_asking_timing:
            direct_verdict.append("* புத்திர யோகம் கைமேல் வரும் காலம்: கீழே குறிப்பிடப்பட்டுள்ள சாதகமான கோட்சார காலத்தில் மருத்துவ முயற்சிகள் மற்றும் சுப காரியங்களை மேற்கொள்வது பூரண பலன் தரும்.")
    elif bhava_num == 10:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்கு ஜீவன ஸ்தானமான 10-ஆம் வீடு '{target_sign}' ராசியாக அமைகிறது.")
        direct_verdict.append("* தொழில் மற்றும் உத்தியோகத்தில் நிலையான முன்னேற்றமும், அதிகார பலமும் கிடைக்கக்கூடிய சாதகமான அமைப்புகள் உள்ளன.")
    elif bhava_num == 4:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்கு 4-ஆம் வீடான சுக ஸ்தானம் '{target_sign}' ராசி.")
        direct_verdict.append(f"* சொத்து & வாகன யோகம்: பூமி காரகன் செவ்வாய் மற்றும் 4-ஆம் அதிபதி {target_lord} பலத்தால் சொந்த வீடு மற்றும் நில யோகம் உண்டு.")
    elif bhava_num == 6:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்கு 6-ஆம் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append("* கடன் & பிரச்சனை நிவர்த்தி: நடப்பு தசா பலமும், கோட்சாரத்தில் உபஜெய ஸ்தான சஞ்சாரமும் கடன் சுமைகளைக் குறைக்க உதவும்.")
    elif bhava_num == 7:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்கு களத்திர ஸ்தானமான 7-ஆம் வீடு '{target_sign}' ராசி.")
        direct_verdict.append("* களத்திர யோகம்: குடும்ப அனுகூலமும், நல்ல குணமுள்ள வரன் அமையக்கூடிய சுப அமைப்பும் உள்ளது.")
    elif bhava_num == 9:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்கு பாக்கிய ஸ்தானமான 9-ஆம் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append("* தூரதேசப் பயணம் & விசா: 9-ஆம் பாவகம் சுபத்துவமடையும் சஞ்சாரக் காலத்தில் வெளிநாட்டுப் பயண யோகம் கைகூடும்.")
    else:
        direct_verdict.append(f"* உங்கள் {lagnam} லக்னத்திற்குரிய {bhava_num}-ஆம் பாவகமான {target_sign} ராசி சுப பலம் பெறுகிறது.")
        direct_verdict.append("* கேள்விக்குரிய காரியங்கள் சாதகமான கோட்சார கால எல்லைகளில் விரைந்து நிறைவேறும்.")

    direct_verdict_str = "\n".join(direct_verdict)

    # 6. விண்வெளி பாகை மற்றும் 365 நாட்கள் சஞ்சார கணிதம்
    today = datetime.now()
    planet_obj = PLANET_EPHEM_MAP.get(target_lord, ephem.Sun())
    curr_sign, curr_deg = get_planet_sidereal_info(planet_obj, today)
    all_ranges = get_continuous_ranges(planet_obj, today, 365)

    favorable = []
    cautions = []
    friendly_signs = [s for s, l in SIGN_LORDS.items() if l in lord_meta.get("friends", [])]
    upachaya_signs = [SIGNS[(lagna_idx + u - 1) % 12] for u in [3, 6, 10, 11]]

    for r in all_ranges:
        s = r["sign"]
        if s == lord_meta.get("uccham") or SIGN_LORDS.get(s) == target_lord:
            favorable.append(f"{r['start']} முதல் {r['end']} வரை ({s} ராசி - ஆட்சி/உச்ச பலம்)")
        elif s in friendly_signs or s in upachaya_signs:
            if s not in [lord_meta.get("neecham"), dusthana8, dusthana12]:
                favorable.append(f"{r['start']} முதல் {r['end']} வரை ({s} ராசி - சாதக சஞ்சாரம்)")
        if s == lord_meta.get("neecham") or s in [dusthana8, dusthana12]:
            cautions.append(f"{r['start']} முதல் {r['end']} வரை ({s} ராசி)")

    fav_str = "\n    * " + "\n    * ".join(favorable[:4]) if favorable else f"\n    * {target_lord} பகவான் உபஜெய ஸ்தானங்களில் சஞ்சரிக்கும் நாட்கள்"
    caut_str = "\n    * " + "\n    * ".join(cautions[:3]) if cautions else f"\n    * {target_lord} பகவான் மறைவு ஸ்தான சஞ்சார காலங்கள்"

    bhava_cautions = {
        1: "உடல் நலம் மற்றும் ஆரோக்கியத்தில் கூடுதல் கவனம் செலுத்துவது நலம்.",
        2: "பணப் பரிவர்த்தனைகளில் விழிப்புணர்வும், சேமிப்பைப் பாதுகாப்பதும் நலம்.",
        3: "உடன்பிறந்தவர்களிடம் விட்டுக் கொடுத்துச் செல்வதும், பயணங்களில் விழிப்புடன் இருப்பதும் நலம்.",
        4: "சொத்து மற்றும் வாகனப் பராமரிப்பில் கவனமும், தாயாரின் உடல்நலனில் அக்கறையும் நலம்.",
        5: "கருத்தரிப்பு மற்றும் குழந்தை நலம் சார்ந்த விஷயங்களில் முறையான மருத்துவ நெறிமுறைகளைப் பின்பற்றுவது நலம்.",
        6: "புதிய கடன்கள் வாங்குவதைத் தவிர்ப்பதும், முறையான மருத்துவப் பரிசோதனைகளும் நலம்.",
        7: "வாழ்க்கைத் துணையிடம் விட்டுக் கொடுத்துச் செல்வதும், அவசர முடிவுகளைத் தவிர்ப்பதும் நலம்.",
        8: "தொலைதூரப் பயணங்களில் எச்சரிக்கையும், எதிர்பாராத தடைகளில் நிதானமும் நலம்.",
        9: "தந்தையாரின் உடல்நலத்தில் கவனமும், தூரப் பயண ஆவணங்களைச் சரிபார்ப்பதும் நலம்.",
        10: "பணியிடத்தில் மேலதிகாரிகளிடம் விவாதங்களைத் தவிர்ப்பதும், தொழில் நிதானமும் நலம்.",
        11: "நண்பர்களிடம் சுமுக உறவைப் பேணுதலும், புதிய முதலீடுகளில் விழிப்புணர்வும் நலம்.",
        12: "வீண் விரயங்களைத் தவிர்ப்பதும், மருத்துவச் செலவுகளில் திட்டமிடலும் நலம்."
    }
    domain_caution = bhava_cautions.get(bhava_num, "இக்காலங்களில் நிதானத்துடன் கூடிய திட்டமிடலும், இறை வழிபாடும் நலம்.")

    # தசா குறிப்பு
    if curr_dasa_lord:
        is_dasa_friendly = target_lord in PLANET_RULES.get(curr_dasa_lord, {}).get("friends", []) or target_lord == curr_dasa_lord
        dasa_note = f"* நடப்பு விம்சொத்தரி தசா ஆய்வு: பிறப்பு தசா இருப்பைக் கடந்து தற்போது உங்களுக்கு நடப்பது {curr_dasa_lord} தசா."
        dasa_note += f"\n  ({'நடப்பு தசா நாதனும் கேள்விக்குரிய பாவக அதிபதியும் நட்பு கிரகங்களாக அமைவதால் காரிய அனுகூலம் உண்டு.' if is_dasa_friendly else 'நடப்பு தசா நாதனும் பாவக அதிபதியும் சம/பகை நிலையிலிருப்பதால் சுமாரான பலன்களே கிட்டும்.'})"
    else:
        dasa_note = f"* ஜன்ம ராசி: உங்கள் ராசி {rasi}. கேள்விக்குரிய பாவக அதிபதி {target_lord}-ன் கோட்சார சஞ்சாரம் முதன்மைப் பங்கு வகிக்கிறது."

    # அனைத்து 12 வீடுகளின் தன்மைகள் (சர, ஸ்திர, உபய சுபாவம்)
    sign_natures = {
        "மேஷம்": "சர ராசி (முற்றிலும் புதிய / அசல் / வெளியூர்)", "ரிஷபம்": "ஸ்திர ராசி (நிலையான / சொந்தம் / உள்ளூர்)",
        "மிதுனம்": "உபய ராசி (இரட்டைத் தன்மை / தூரத்து சொந்தம்)", "கடகம்": "சர ராசி (முற்றிலும் புதிய / அசல் / வெளியூர்)",
        "சிம்மம்": "ஸ்திர ராசி (நிலையான / சொந்தம் / உள்ளூர்)", "கன்னி": "உபய ராசி (இரட்டைத் தன்மை / தூரத்து சொந்தம்)",
        "துலாம்": "சர ராசி (முற்றிலும் புதிய / அசல் / வெளியூர்)", "விருச்சிகம்": "ஸ்திர ராசி (நிலையான / சொந்தம் / உள்ளூர்)",
        "தனுசு": "உபய ராசி (இரட்டைத் தன்மை / தூரத்து சொந்தம்)", "மகரம்": "சர ராசி (முற்றிலும் புதிய / அசல் / வெளியூர்)",
        "கும்பம்": "ஸ்திர ராசி (நிலையான / சொந்தம் / உள்ளூர்)", "மீனம்": "உபய ராசி (இரட்டைத் தன்மை / தூரத்து சொந்தம்)"
    }
    target_nature = sign_natures.get(target_sign, "சர ராசி")

    # வானியல் தரவுகளை JSON ஆக API-க்கு அனுப்புதல்
    astro_data = {
        "user_name": user_name,
        "lagnam": lagnam,
        "rasi": rasi,
        "bhava_num": bhava_num,
        "target_sign": target_sign,
        "target_nature": target_nature,
        "target_gender": target_gender,
        "target_lord": target_lord,
        "karaka": karaka,
        "curr_deg": round(curr_deg, 2),
        "curr_dasa": curr_dasa_lord,
        "favorable_dates": favorable[:4],
        "caution_dates": cautions[:3],
        "remedy_day": lord_meta.get("day"),
        "remedy_deity": lord_meta.get("deity"),
        "remedy_item": lord_meta.get("remedy")
    }

    print(json.dumps(astro_data, ensure_ascii=False))

if __name__ == "__main__":
    main()