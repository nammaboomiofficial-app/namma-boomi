export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
  const data = await response.json();
  const models = data.models?.map(m => m.name) || data;
  res.status(200).json({ available_models: models });
}