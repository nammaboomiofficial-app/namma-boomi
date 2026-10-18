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
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
You are an expert ATS Resume Writer.
Rewrite, translate Tanglish/Tamil inputs into flawless, high-impact corporate English.

User Input:
${JSON.stringify(resumeData)}

Return ONLY valid JSON matching this exact structure:
{
  "fullName": "${resumeData?.fullName || 'Full Name'}",
  "jobTitle": "${resumeData?.jobTitle || 'Professional Title'}",
  "email": "${resumeData?.email || ''}",
  "phone": "${resumeData?.phone || ''}",
  "location": "${resumeData?.location || ''}",
  "summary": "Professional summary highlighting key achievements, core skills, and value proposition.",
  "skills": "Key Skill 1, Key Skill 2, Key Skill 3, Core Competency",
  "experience": [
    {
      "role": "Job Role / Title",
      "company": "Company Name",
      "period": "Start Year - End Year",
      "desc": "Key responsibility or achievement highlighting measurable impact."
    }
  ],
  "education": [
    {
      "degree": "Degree / Certification",
      "institution": "University / College Name",
      "year": "Graduation Year"
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

    // நெட்வொர்க் அல்லது API பிழை வந்தால் பாதுகாப்பான பொதுவான பேக்கப் டேட்டா
    const fallbackData = {
      ...resumeData,
      fullName: resumeData?.fullName ? resumeData.fullName.toUpperCase() : "APPLICANT NAME",
      jobTitle: resumeData?.jobTitle || "Professional",
      location: resumeData?.location || "Tamil Nadu, India",
      summary: "Results-driven professional with proven experience, dedicated to operational excellence and organizational growth.",
      skills: "Operations Management, Team Leadership, Process Optimization, Strategic Planning",
      experience: resumeData?.experience?.length ? resumeData.experience.map((exp) => ({
        ...exp,
        role: exp.role || "Specialist / Lead",
        company: exp.company || "Enterprise Solutions",
        period: exp.period || "Past Experience",
        desc: exp.desc || "Handled core operational responsibilities, improved workflow efficiency, and collaborated across teams."
      })) : [
        {
          role: "Professional",
          company: "Enterprise Solutions",
          period: "Recent",
          desc: "Handled key operational tasks and contributed to business growth."
        }
      ],
      education: resumeData?.education?.length ? resumeData.education.map((edu) => ({
        ...edu,
        degree: edu.degree || "Bachelor's Degree",
        institution: edu.institution || "Recognized Institution",
        year: edu.year || "Completed"
      })) : [
        {
          degree: "Bachelor's Degree",
          institution: "Recognized Institution",
          year: "Completed"
        }
      ]
    };

    return res.status(200).json({ data: fallbackData });
  }
}