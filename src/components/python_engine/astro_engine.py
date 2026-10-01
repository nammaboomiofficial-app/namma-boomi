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
    "சூரியன்": {"uccham": "மேஷம்", "neecham": "துலாம்", "own": ["சிம்மம்"], "friends": ["சந்திரன்", "செவ்வாய்", "குரு"], "day": "ஞாயிற்றுக்கிழமை", "deity": "சிவபெருமான் மற்றும் சூரிய நாராயணர்", "grain": "கோதுமை"},
    "சந்திரன்": {"uccham": "ரிஷபம்", "neecham": "விருச்சிகம்", "own": ["கடகம்"], "friends": ["சூரியன்", "புதன்"], "day": "திங்கட்கிழமை", "deity": "அம்பாள் மற்றும் பார்வதி தேவி", "grain": "பச்சரிசி"},
    "செவ்வாய்": {"uccham": "மகரம்", "neecham": "கடகம்", "own": ["மேஷம்", "விருச்சிகம்"], "friends": ["சூரியன்", "சந்திரன்", "குரு"], "day": "செவ்வாய்க்கிழமை", "deity": "முருகப்பெருமான்", "grain": "துவரை"},
    "புதன்": {"uccham": "கன்னி", "neecham": "மீனம்", "own": ["மிதுனம்", "கன்னி"], "friends": ["சூரியன்", "சுக்கிரன்"], "day": "புதன்கிழமை", "deity": "மகாவிஷ்ணு", "grain": "பச்சைப்பயறு"},
    "குரு": {"uccham": "கடகம்", "neecham": "மகரம்", "own": ["தனுசு", "மீனம்"], "friends": ["சூரியன்", "சந்திரன்", "செவ்வாய்"], "day": "வியாழக்கிழமை", "deity": "தட்சிணாமூர்த்தி", "grain": "கொண்டைக்கடலை"},
    "சுக்கிரன்": {"uccham": "மீனம்", "neecham": "கன்னி", "own": ["ரிஷபம்", "துலாம்"], "friends": ["புதன்", "சனி"], "day": "வெள்ளிக்கிழமை", "deity": "மகாலட்சுமி தாயார்", "grain": "மொச்சை"},
    "சனி": {"uccham": "துலாம்", "neecham": "மேஷம்", "own": ["மகரம்", "கும்பம்"], "friends": ["புதன்", "சுக்கிரன்"], "day": "சனிக்கிழமை", "deity": "ஈஸ்வரன் மற்றும் சனி பகவான்", "grain": "கருப்பு எள்"}
}

VIMSHOTTARI_CYCLE = [
    ("கேது", 7), ("சுக்கிரன்", 20), ("சூரியன்", 6), ("சந்திரன்", 10),
    ("செவ்வாய்", 7), ("ராகு", 18), ("குரு", 16), ("சனி", 19), ("புதன்", 17)
]

# 2. விம்சோத்தரி தசா கணிதம்
def calculate_current_dasa(dob_str, balance_str):
    if not dob_str or not balance_str:
        return None, None, None

    dob_dt = None
    for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y"):
        try:
            dob_dt = datetime.strptime(dob_str.strip(), fmt)
            break
        except ValueError:
            continue

    if not dob_dt:
        return None, None, None

    start_lord = None
    for name, _ in VIMSHOTTARI_CYCLE:
        if name in balance_str:
            start_lord = name
            break

    if not start_lord:
        return None, None, None

    nums = re.findall(r"[-+]?\d*\.\d+|\d+", balance_str)
    if not nums:
        return None, None, None
    balance_years = float(nums[0])

    dasa_end_dt = dob_dt + timedelta(days=int(balance_years * 365.25))

    start_idx = 0
    for idx, (p_name, _) in enumerate(VIMSHOTTARI_CYCLE):
        if p_name == start_lord:
            start_idx = idx
            break

    curr_idx = (start_idx + 1) % len(VIMSHOTTARI_CYCLE)
    now_dt = datetime.now()

    curr_dasa_lord = start_lord
    dasa_span_start = dob_dt
    dasa_span_end = dasa_end_dt

    while dasa_end_dt < now_dt:
        p_name, p_years = VIMSHOTTARI_CYCLE[curr_idx]
        dasa_span_start = dasa_end_dt
        dasa_end_dt = dasa_end_dt + timedelta(days=int(p_years * 365.25))
        curr_dasa_lord = p_name
        dasa_span_end = dasa_end_dt
        curr_idx = (curr_idx + 1) % len(VIMSHOTTARI_CYCLE)

    return curr_dasa_lord, dasa_span_start.strftime("%Y"), dasa_span_end.strftime("%Y")

# 3. அயனாம்சம் & நிராயன கோட்சார பாகை
def get_lahiri_ayanamsa(dt):
    t = (dt - datetime(2000, 1, 1, 12, 0)).total_seconds() / (365.25 * 86400)
    return 23.85 + (t * (50.29 / 3600.0))

def get_planet_sidereal_info(planet_obj, dt):
    observer = ephem.Observer()
    observer.date = dt
    planet_obj.compute(observer)
    ecl = ephem.Ecliptic(planet_obj)
    deg_trop = math.degrees(ecl.lon)
    deg_sid = (deg_trop - get_lahiri_ayanamsa(dt)) % 360
    s_idx = int(deg_sid // 30)
    return SIGNS[s_idx], deg_sid % 30

def get_continuous_ranges(planet_obj, start_dt, days=365):
    ranges = []
    curr_dt = start_dt
    curr_sign, _ = get_planet_sidereal_info(planet_obj, curr_dt)
    seg_start = curr_dt

    for d in range(1, days + 1):
        test_dt = start_dt + timedelta(days=d)
        s_name, _ = get_planet_sidereal_info(planet_obj, test_dt)
        if s_name != curr_sign or d == days:
            ranges.append({
                "sign": curr_sign,
                "start": seg_start.strftime("%d-%m-%Y"),
                "end": test_dt.strftime("%d-%m-%Y")
            })
            curr_sign = s_name
            seg_start = test_dt
    return ranges

def main():
    try:
        raw_in = sys.argv[1] if len(sys.argv) > 1 else "{}"
        payload = json.loads(raw_in)
    except Exception:
        payload = {}

    user_name = payload.get("name")
    lagnam = payload.get("lagnam")
    rasi = payload.get("rasi")
    dob_str = payload.get("dob")
    balance_str = payload.get("dasa_balance")
    question = payload.get("question", "").strip()

    if not user_name:
        user_name = "அன்பர்"

    if not lagnam or lagnam not in SIGNS:
        print(json.dumps({"reply": "லக்ன விவரங்கள் கிடைக்கவில்லை. தயவுசெய்து உங்கள் ஜாதகக் குறிப்பை மீண்டும் திரையிட்டு கணக்கிடவும்."}, ensure_ascii=False))
        return

    if not question:
        print(json.dumps({"reply": "தயவுசெய்து நீங்கள் அறிய விரும்பும் கேள்வியைத் தட்டச்சு செய்யவும்."}, ensure_ascii=False))
        return

    lagna_idx = SIGNS.index(lagnam)
    curr_dasa_lord, dasa_s_yr, dasa_e_yr = calculate_current_dasa(dob_str, balance_str)

    q = question.lower()

    # 4. ஆழமான வினா வகைப்பாடு (Domain Detection)
    if any(k in q for k in ["குழந்தை", "புத்திர", "கருத்தரி", "மகன்", "மகள்", "child", "baby", "pregnancy", "kuzhanthai", "pullai", "puthira"]):
        bhava_num = 5
        category = "புத்திர பாக்கியம் மற்றும் பூர்வ புண்ணியம்"
        karaka = "குரு"
    elif any(k in q for k in ["திருமண", "கல்யாண", "வரன்", "பொருத்தம்", "மனைவி", "கணவன்", "marriage", "wedding", "marry", "spouse", "kalyanam", "thirumanam"]):
        bhava_num = 7
        category = "திருமணம் / களத்திர யோகம்"
        karaka = "சுக்கிரன்"
    elif any(k in q for k in ["வீடு", "மனை", "சொத்து", "நிலம்", "வாகனம்", "கார்", "வண்டி", "house", "property", "land", "vehicle", "veedu", "manai", "sothu", "nilam"]):
        bhava_num = 4
        category = "சொத்து / பூமி / வாகன யோகம்"
        karaka = "செவ்வாய்"
    elif any(k in q for k in ["கடன்", "நோய்", "மருத்துவ", "வழக்கு", "எதிரி", "debt", "loan", "health", "court", "case", "kadan", "noy"]):
        bhava_num = 6
        category = "ருண ரோக சத்ரு நிவர்த்தி (கடன், உடல்நலம், வழக்கு)"
        karaka = "சனி"
    elif any(k in q for k in ["வெளிநாடு", "பயணம்", "விசா", "உயர் கல்வி", "foreign", "visa", "travel", "higher education", "velinaadu"]):
        bhava_num = 9
        category = "பாக்கிய ஸ்தானம் மற்றும் தூரதேசப் பயணம்"
        karaka = "ராகு"
    elif any(k in q for k in ["பணம்", "வரவு", "நிதி", "சேமிப்பு", "வருமான", "money", "wealth", "finance", "savings", "panam", "varavu"]):
        bhava_num = 2
        category = "தன ஸ்தானம் மற்றும் நிதி ஆதாயம்"
        karaka = "குரு"
    else:
        bhava_num = 10
        category = "ஜீவன ஸ்தானம் (தொழில் / உத்தியோகம் / பதவி உயர்வு)"
        karaka = "சூரியன்"

    target_sign = SIGNS[(lagna_idx + bhava_num - 1) % 12]
    target_lord = SIGN_LORDS[target_sign]
    target_gender = SIGN_GENDERS[target_sign]
    dusthana8 = SIGNS[(lagna_idx + 8 - 1) % 12]
    dusthana12 = SIGNS[(lagna_idx + 12 - 1) % 12]
    lord_meta = PLANET_RULES.get(target_lord, PLANET_RULES["சூரியன்"])

    # 5. வினாவின் நோக்கத்திற்குரிய நேரடி சாஸ்திரத் தீர்ப்பு (Direct Intent Resolution)
    is_asking_count = any(k in q for k in ["எத்தனை", "எத்தன", "how many", "count", "ethanai", "ethana"])
    is_asking_timing = any(k in q for k in ["எப்போது", "எப்பொழுது", "காலம்", "when", "time", "eppo", "eppothu"])
    is_asking_yes_no = any(k in q for k in ["உண்டா", "வருமா", "கிடைக்குமா", "சாத்தியமா", "is there", "will i", "undaa", "kedaikuma", "varuma"])

    direct_verdict = []

    if bhava_num == 5: # குழந்தை பாக்கியம்
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்கு 5-ஆம் வீடான புத்திர ஸ்தானம் '{target_sign}' ராசியாக அமைகிறது. இதன் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append(f"புத்திர ஸ்தானம் {target_gender} ராசியாக அமைவதாலும், புத்திர காரகனான குருவின் இயற்கை சுபத்துவத்தாலும் உங்கள் ஜாதகத்தில் தீர்க்கமான குழந்தைப் பாக்கிய யோகம் உறுதியாக உள்ளது.")
        if is_asking_count:
            count_res = "இரட்டைப் படை (பெண்) ராசி பலம் பெற்று அமைவதால் இயல்பாகவே 2 குழந்தைகள் அமைய சாஸ்திர விதிகளின்படி அதிக சாத்தியக்கூறுகள் உள்ளன." if target_gender == "பெண்" else "ஒற்றைப் படை (ஆண்) ராசி அதிபதி ஆளுமையால் 1 முதல் 2 குழந்தைகள் யோகம் சிறப்பாக அமையும்."
            direct_verdict.append(f"குழந்தைகளின் எண்ணிக்கை விபரம்: {count_res}")
        if is_asking_timing:
            direct_verdict.append("புத்திர யோகம் கைமேல் வரும் காலம்: கீழே குறிப்பிடப்பட்டுள்ள சாதகமான கோட்சார காலத்தில் கருத்தரித்தல் மற்றும் சுபச் செய்திகள் கைகூடும்.")

    elif bhava_num == 10: # தொழில் / வேலை / பதவி உயர்வு
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்கு ஜீவன ஸ்தானமான 10-ஆம் வீடு '{target_sign}' ராசி. இதன் அதிபதி {target_lord} பகவான் ஆவார்.")
        if any(k in q for k in ["பதவி", "உயர்வு", "promotion", "pathavi"]):
            direct_verdict.append("பதவி உயர்வு & அங்கீகாரம்: 10-ஆம் அதிபதி ஆட்சி பலம் பெறும் சாதகமான சஞ்சாரக் காலத்தில் உத்தியோக உயர்வு, புதிய பொறுப்புகள் மற்றும் நிர்வாக அங்கீகாரம் நிச்சயம் கை கூடும்.")
        elif any(k in q for k in ["மாற்றம்", "புதிய", "change", "new job"]):
            direct_verdict.append("உத்தியோக மாற்றம்: சாதகமான கோட்சார நாட்களில் நீங்கள் அனுப்பும் நேர்காணல்கள், புதிய வேலை முயற்சிகள் சாதகமான முடிவைத் தரும்.")
        else:
            direct_verdict.append("தொழில் நிலைப்புத்தன்மை: ஜீவனாதிபதியின் பலத்தால் நிலையான முன்னேற்றமும், வியாபார விரிவாக்கமும் சாத்தியமாகும்.")

    elif bhava_num == 4: # வீடு / வாகனம்
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்கு 4-ஆம் வீடான சுக ஸ்தானம் '{target_sign}' ராசி. இதன் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append("சொத்து & வாகன யோகம்: பூமி காரகன் செவ்வாய் மற்றும் 4-ஆம் அதிபதியின் சுப அமைப்பால் சொந்த வீடு, நிலம் அல்லது வாகனம் வாங்கும் பாக்கியம் ஜாதகத்தில் முழுமையாக உள்ளது.")

    elif bhava_num == 6: # கடன் / நோய்
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்கு 6-ஆம் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append("கடன் & பிரச்சனை நிவர்த்தி: நடப்பு தசா பலமும், கோட்சாரத்தில் உபஜெய ஸ்தான சஞ்சாரமும் இணையும் காலத்தில் பழைய கடன்கள் படிப்படியாக வசூலாகி சுமை குறையும்.")

    elif bhava_num == 7: # திருமணம்
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்கு களத்திர ஸ்தானமான 7-ஆம் வீடு '{target_sign}' ராசி. இதன் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append("களத்திர யோகம்: குடும்ப அனுகூலமும், நல்ல குணமுள்ள வரன் அமையக்கூடிய சுப அமைப்பும் ஜாதக விதிகளின்படி தெளிவாக உள்ளது.")

    elif bhava_num == 9: # வெளிநாடு / பாக்கியம்
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்கு பாக்கிய ஸ்தானமான 9-ஆம் அதிபதி {target_lord} பகவான்.")
        direct_verdict.append("தூரதேசப் பயணம் & விசா: 9-ஆம் பாவகம் சுபத்துவமடையும் சஞ்சாரக் காலத்தில் வெளிநாட்டுப் பயணம், விசா அனுமதி மற்றும் உயர் கல்வி முயற்சிகள் முழு வெற்றியடையும்.")

    else:
        direct_verdict.append(f"உங்கள் {lagnam} லக்னத்திற்குரிய {bhava_num}-ஆம் பாவகமான {target_sign} ராசியின் அதிபதி {target_lord} பகவான் ஆவார்.")
        direct_verdict.append("கேள்விக்குரிய காரியங்கள் சாதகமான கோட்சார கால எல்லைகளில் விரைந்து நிறைவேறும்.")

    direct_verdict_str = "\n".join([f"* {v}" for v in direct_verdict])

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
        if s == lord_meta["uccham"] or SIGN_LORDS[s] == target_lord:
            favorable.append(f"{r['start']} முதல் {r['end']} வரை ({s} ராசி - ஆட்சி/உச்ச பலம்)")
        elif s in friendly_signs or s in upachaya_signs:
            if s not in [lord_meta["neecham"], dusthana8, dusthana12]:
                favorable.append(f"{r['start']} முதல் {r['end']} வரை ({s} ராசி - சாதக சஞ்சாரம்)")

        if s == lord_meta["neecham"] or s in [dusthana8, dusthana12]:
            cautions.append(f"{r['start']} முதல் {r['end']} வரை ({s} ராசி)")

    fav_str = "\n   * " + "\n   * ".join(favorable[:4]) if favorable else f"\n   * {target_lord} பகவான் உபஜெய ஸ்தானங்களில் சஞ்சரிக்கும் காலகட்டங்கள் சாதகமாக அமையும்."
    caut_str = "\n   * " + "\n   * ".join(cautions[:3]) if cautions else f"\n   * மறைவு ஸ்தான சஞ்சார காலங்களில் கூடுதல் விழிப்புணர்வு தேவை."

    # தசா குறிப்பு
    if curr_dasa_lord:
        is_dasa_friendly = target_lord in PLANET_RULES.get(curr_dasa_lord, {}).get("friends", []) or target_lord == curr_dasa_lord
        dasa_note = f"* நடப்பு விம்சோத்தரி தசா ஆய்வு: பிறப்பு தசா இருப்பைக் கடந்து தற்போது உங்களுக்கு நடப்பது {curr_dasa_lord} மகா தசை ({dasa_s_yr} - {dasa_e_yr}). " + \
                    ("நடப்பு தசா நாதனும் கேள்விக்குரிய பாவக அதிபதியும் நட்பு கிரகங்களாக அமைவதால் காரிய அனுகூலம் விரைந்து கைகூடும்." if is_dasa_friendly else "நடப்பு தசா நாதனும் பாவக அதிபதியும் சம/பகை நிலையில் உள்ளதால் முயற்சிகள் படிப்படியாகவே பலன் தரும்.")
    else:
        dasa_note = f"* ஜன்ம ராசி: உங்கள் ராசி {rasi}. கேள்விக்குரிய பாவக அதிபதி {target_lord}-ன் கோட்சார சஞ்சாரம் முதன்மைப் பங்கு வகிக்கிறது."

    # இறுதி விடை வெளியீடு
    reply = f"""வணக்கம் {user_name} அவர்களுக்கு!

1. உங்கள் கேள்விக்கான நேரடி சாஸ்திரத் தீர்ப்பு:
{direct_verdict_str}

2. விண்வெளிப் பாவக ஆய்வு ({lagnam} லக்னம் - {category}):
* லக்ன நிலை: உங்கள் ஜன்ம லக்னம் {lagnam}. கேள்விக்குரிய {bhava_num}-ஆம் பாவகமாக அமைவது {target_sign} ராசி ({target_gender} ராசி).
* பாவக அதிபதி: {target_sign} ராசியின் அதிபதி {target_lord} பகவான். காரக கிரகம்: {karaka} பகவான்.
* நடப்பு விண்வெளி பாகை (Ephemeris Longitude): {target_lord} பகவான் தற்போது வானில் {curr_sign} ராசியில் {curr_deg:.2f}° பாகையில் சஞ்சரிக்கிறார்.
{dasa_note}

3. காரியம் கைகூடும் சாதகமான தொடர் காலக்கட்டங்கள் (Ingress Date Range):
நாசாவின் வானியல் சஞ்சாரக் கணிதத்தின்படி, உங்கள் {bhava_num}-ஆம் அதிபதி {target_lord} வலிமை பெற்று சஞ்சரிக்கும் துல்லியமான நாட்கள்:{fav_str}
இந்தக் காலகட்டங்களில் நீங்கள் எடுக்கும் முயற்சிகள் பூரண பலனைத் தரும்.

4. எச்சரிக்கையுடன் இருக்க வேண்டிய சஞ்சார நாட்கள்:
{target_lord} பலவீனம் அல்லது மறைவு ஸ்தானங்களில் சஞ்சரிக்கும் கால எல்லைகள்:{caut_str}
இக்காலங்களில் அவசர முடிவுகளையும், கடன் பிணையங்களையும் தவிர்ப்பது நலம்.

5. வேத சாஸ்திரப் பரிகாரம்:
{bhava_num}-ஆம் பாவகக் கதிர்வீச்சு சுபத்துவமடைய, {target_lord}-க்குரிய {lord_meta['day']} தோறும் {lord_meta['deity']} வழிபாடு செய்து, {lord_meta['grain']} தானம் அளிப்பது காரியத் தடைகளை விலக்கும்."""

    print(json.dumps({"reply": reply}, ensure_ascii=False))

if __name__ == "__main__":
    main()