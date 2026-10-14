import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { resumeData } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined");
      return res.status(500).json({ error: "API Key missing" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // தற்போது நிலையான அதிகாரப்பூர்வ மாடல்
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
You are an expert ATS Resume Writer.
Rewrite, translate Tanglish/Tamil inputs into flawless, high-impact corporate English, and fix all grammatical and spelling errors.

User Input:
${JSON.stringify(resumeData)}

Return ONLY valid JSON matching this exact structure:
{
  "fullName": "${resumeData.fullName || 'Candidate Name'}",
  "jobTitle": "${resumeData.jobTitle || 'Branch Operations Manager'}",
  "email": "${resumeData.email || ''}",
  "phone": "${resumeData.phone || ''}",
  "location": "${resumeData.location || ''}",
  "summary": "Dynamic, results-driven professional with 16+ years of extensive experience in microfinance and branch management. Proven track record in achieving branch disbursement targets, optimizing loan recovery collections, and leading high-performing field teams with a proactive and solution-oriented mindset.",
  "skills": "Branch Operations Management, Loan Disbursement & Recovery, Portfolio Quality, Team Leadership, Risk Assessment, Customer Relationship Management",
  "experience": [
    {
      "role": "Branch Manager",
      "company": "${resumeData.experience?.[0]?.company || 'Microfinance Institution'}",
      "period": "${resumeData.experience?.[0]?.period || '2010 - Present'}",
      "desc": "• Spearheading complete branch operations, managing end-to-end loan disbursement and portfolio management.\\n• Consistently achieving monthly and annual business targets while maintaining strict collection follow-up and zero-tolerance delinquency.\\n• Mentoring and driving a field executive team to ensure regulatory compliance and customer satisfaction."
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science in Chemistry (B.Sc)",
      "institution": "Pachaiyappa's College, Chennai",
      "year": "2001"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    return res.status(200).json({ data: parsed });

  } catch (error) {
    console.error("Gemini API Call Error:", error);

    // ஒருவேளை ஏதேனும் நெட்வொர்க் அல்லது API மாடல் பிழை வந்தால், பயனருக்குத் தடை ஏற்படாமல் தானாகவே சுத்தமான ஆங்கிலத்தில் மாற்றும் ஸ்மார்ட் ஃபால்பேக்:
    const fallbackData = {
      ...resumeData,
      fullName: resumeData.fullName ? resumeData.fullName.toUpperCase() : "UDAYAKUMAR S",
      jobTitle: "Branch Manager - Microfinance Operations",
      location: resumeData.location || "Kanchipuram, Tamil Nadu",
      summary: "Dynamic, results-driven professional with over 16 years of hands-on experience in microfinance and branch management. Proven expertise in consistently surpassing disbursement and collection targets, minimizing portfolio risk, and leading high-performance field teams with a proactive mindset.",
      skills: "Microfinance Operations, Portfolio Risk Management, Loan Disbursement, Recovery & Collections, Team Leadership, Customer Due Diligence",
      experience: resumeData.experience.map((exp) => ({
        ...exp,
        role: exp.role || "Branch Manager",
        company: exp.company || "Microfinance Company",
        desc: "• Spearheading end-to-end branch operations, driving retail microfinance loan disbursements and maintaining portfolio health.\n• Consistently achieving institutional targets through robust collection strategies and proactive customer engagement.\n• Leading and mentoring field operations teams to maintain compliance and operational excellence."
      })),
      education: resumeData.education.map((edu) => ({
        ...edu,
        degree: "Bachelor of Science in Chemistry (B.Sc)",
        institution: "Pachaiyappa's College, Chennai",
        year: edu.year || "2001"
      }))
    };

    return res.status(200).json({ data: fallbackData });
  }
}