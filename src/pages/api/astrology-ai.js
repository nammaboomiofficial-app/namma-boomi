import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const body = req.body || {};
  const astro = body.astroData || {};
  const prof = body.profile || {};
  const data = astro.horoscope || astro.reportData || astro || prof;

  // பயனர் விவரங்கள்
  const userName = prof.name || body.name || "udayakumar s";
  const lagnam = astro.lagnam || astro.lagna || astro.ascendant || data.lagnam || data.lagna || body.lagnam || "மகரம்";
  const rasi = astro.rasi || astro.moonSign || data.rasi || "கன்னி";
  const dob = prof.dob || body.dob || "26/08/1979";
  const dasaBalance = astro.dasaBalance || astro.currentDasa || data.currentDasa || "சந்திரன் தசை இருப்பு: 2.7 ஆண்டுகள்";
  const userQuestion = (body.question || body.query || '').trim();

  // பைத்தானுக்கு அனுப்பப்படும் சுத்தமான தரவு
  const payload = JSON.stringify({
    name: userName,
    lagnam: lagnam,
    rasi: rasi,
    dob: dob,
    dasa_balance: dasaBalance,
    question: userQuestion
  });

  // புதிய python_engine ஃபோல்டரில் உள்ள astro_engine.py-ஐ இயக்குதல்
  const scriptPath = path.join(process.cwd(), 'src', 'components', 'python_engine', 'astro_engine.py');
  const pyProcess = spawn('python', [scriptPath, payload]);

  let outputData = '';
  let errorData = '';

  pyProcess.stdout.on('data', (chunk) => {
    outputData += chunk.toString('utf8');
  });

  pyProcess.stderr.on('data', (chunk) => {
    errorData += chunk.toString('utf8');
  });

  pyProcess.on('close', (code) => {
    if (code !== 0 || !outputData) {
      console.error("[PYTHON ERROR]:", errorData);
      return res.status(500).json({ reply: 'வானியல் கணக்கீட்டில் பிழை ஏற்பட்டுள்ளது.' });
    }

    try {
      const parsed = JSON.parse(outputData.trim());
      return res.status(200).json({ reply: parsed.reply });
    } catch (e) {
      return res.status(200).json({ reply: outputData });
    }
  });
}