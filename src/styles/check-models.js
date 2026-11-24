const { GoogleGenAI } = require('@google/genai');

// பாதுகாப்பான Environment Variable மூலம் API Key பெறுதல்
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function listMyModels() {
  try {
    console.log("புதிய Key-க்கான மாடல்களைத் தேடுகிறது...");
    const pager = await ai.models.list();
    console.log("\n--- அனுமதிக்கப்பட்டுள்ள மாடல்கள் ---");
    for await (const model of pager) {
      console.log(model.name);
    }
    console.log("------------------------------------\n");
  } catch (err) {
    console.error("எரர் விவரம்:", err);
  }
}

listMyModels();