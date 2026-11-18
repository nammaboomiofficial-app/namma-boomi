from fastapi import FastAPI
from pydantic import BaseModel
import ephem
import math
import uvicorn
from datetime import datetime, timedelta

app = FastAPI(title="Vedic Astrology Real Math Microservice")

RASHIS = [
    "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", 
    "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்", 
    "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
]

RASHI_LORDS = [
    "செவ்வாய்", "சுக்கிரன்", "புதன்", "சந்திரன்", 
    "சூரியன்", "புதன்", "சுக்கிரன்", "செவ்வாய்", 
    "குரு", "சனி", "சனி", "குரு"
]

NAKSHATRAS = [
    "அஸ்வினி", "பரணி", "கார்த்திகை", "ரோகிணி", "மிருகசீரிஷம்", "திருவாதிரை",
    "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்", "பூரம்", "உத்திரம்",
    "ஹஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை",
    "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்",
    "பூரட்டாதி", "உத்திரட்டாதி", "ரேவதி"
]

class ChartRequest(BaseModel):
    year: int
    month: int
    day: int
    hour: int = 12
    minute: int = 0
    lat: float = 13.0827
    lon: float = 80.2707

def get_lahiri_ayanamsha(dt: datetime) -> float:
    epoch2000 = datetime(2000, 1, 1, 12, 0, 0)
    diff_days = (dt - epoch2000).total_seconds() / 86400.0
    diff_years = diff_days / 365.25
    return 23.85 + (diff_years * (50.29 / 3600.0))

def get_mean_rahu_tropical(dt: datetime) -> float:
    epoch2000 = datetime(2000, 1, 1, 12, 0, 0)
    d = (dt - epoch2000).total_seconds() / 86400.0
    # Mean Longitude of Ascending Lunar Node (Rahu)
    omega = (125.04452 - 0.0529537648 * d) % 360.0
    return omega

def to_sidereal(tropical_deg: float, ayanamsha: float):
    sidereal = (tropical_deg - ayanamsha) % 360.0
    r_idx = int(sidereal // 30)
    deg_in_r = round(sidereal % 30, 2)
    nak_span = 360.0 / 27.0
    nak_idx = int(sidereal // nak_span)
    nak_deg = sidereal % nak_span
    pada = int(nak_deg // (nak_span / 4.0)) + 1
    return {
        "rasiIndex": r_idx,
        "rasiName": RASHIS[r_idx],
        "rasiLord": RASHI_LORDS[r_idx],
        "degreeInRasi": deg_in_r,
        "totalDegree": round(sidereal, 2),
        "nakshatraIndex": nak_idx,
        "nakshatraName": NAKSHATRAS[nak_idx],
        "pada": pada,
        "nakshatraDegree": round(nak_deg, 2)
    }

@app.post("/calculate-chart")
def calculate_chart(req: ChartRequest):
    dt_ist = datetime(req.year, req.month, req.day, req.hour, req.minute)
    dt_utc = dt_ist - timedelta(hours=5, minutes=30)

    ayanamsha = get_lahiri_ayanamsha(dt_utc)

    obs = ephem.Observer()
    obs.lat = str(req.lat)
    obs.lon = str(req.lon)
    obs.date = dt_utc.strftime("%Y/%m/%d %H:%M:%S")

    # லக்னம் கணக்கீடு (Ascendant)
    ramc = float(obs.sidereal_time())
    eps = 23.4392911 * (math.pi / 180.0)
    rad_lat = float(obs.lat)

    y = math.cos(ramc)
    x = - (math.sin(ramc) * math.cos(eps) + math.tan(rad_lat) * math.sin(eps))
    asc_deg = (math.atan2(y, x) * (180.0 / math.pi) + 90.0) % 360.0
    lagna_info = to_sidereal(asc_deg, ayanamsha)

    # கிரகங்கள் கணக்கீடு (9 கிரகங்கள்)
    bodies = {
        "சூரியன்": ephem.Sun(obs),
        "சந்திரன்": ephem.Moon(obs),
        "செவ்வாய்": ephem.Mars(obs),
        "புதன்": ephem.Mercury(obs),
        "குரு": ephem.Jupiter(obs),
        "சுக்கிரன்": ephem.Venus(obs),
        "சனி": ephem.Saturn(obs)
    }

    planets_data = {}
    for name, body in bodies.items():
        ecl = ephem.Ecliptic(body)
        lon_deg = math.degrees(float(ecl.lon))
        planets_data[name] = to_sidereal(lon_deg, ayanamsha)

    rahu_trop = get_mean_rahu_tropical(dt_utc)
    ketu_trop = (rahu_trop + 180.0) % 360.0
    planets_data["ராகு"] = to_sidereal(rahu_trop, ayanamsha)
    planets_data["கேது"] = to_sidereal(ketu_trop, ayanamsha)

    return {
        "lagna": lagna_info,
        "planets": planets_data,
        "ayanamsha": round(ayanamsha, 2)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)