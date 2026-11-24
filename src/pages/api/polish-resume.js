import { askGemini } from '@/lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { resumeData } = req.body;

  if (!resumeData) {
    return res.status(400).json({ error: 'Resume data is required' });
  }

  try {
    const prompt = `
You are an Executive ATS Resume Writer & Career Strategist.
Rewrite, refine, and translate any Tamil or Tanglish inputs into flawless, high-impact corporate English optimized for modern Applicant Tracking Systems (ATS).
Use strong action verbs (e.g., Spearheaded, Optimized, Executed, Streamlined, Managed) and professional phrasing.

User Input:
${JSON.stringify(resumeData)}

Return ONLY valid JSON matching this exact structure (no markdown fences, no extra commentary):
{
  "fullName": "${resumeData?.fullName || 'Full Name'}",
  "jobTitle": "Refined Executive Job Title",
  "email": "${resumeData?.email || ''}",
  "phone": "${resumeData?.phone || ''}",
  "location": "${resumeData?.location || ''}",
  "summary": "Compelling 3-line ATS-optimized executive summary highlighting domain expertise, key achievements, and core value proposition.",
  "skills": "Skill 1, Skill 2, Skill 3, Skill 4, Skill 5, Skill 6",
  "experience": [
    {
      "role": "Refined Job Role / Title",
      "company": "Company Name",
      "period": "Start Year - End Year",
      "desc": "High-impact bullet points separated by periods highlighting measurable outcomes, leadership, and operational excellence."
    }
  ],
  "education": [
    {
      "degree": "Refined Degree / Certification Name",
      "institution": "University / College Name",
      "year": "Graduation Year"
    }
  ]
}
`;

    // வேகமான & துல்லியமான gemini-3.5-flash (pro mode) + நேரடி JSON வெளியீடு
    const responseText = await askGemini(prompt, {
      mode: 'pro',
      jsonMode: true,
      maxTokens: 2048,
      temperature: 0.4,
    });

    const cleanJson = responseText.replace(/```json|```/gi, '').trim();
    const parsed = JSON.parse(cleanJson);

    return res.status(200).json({ data: parsed });

  } catch (error) {
    console.error("ATS Resume AI Error:", error);

    // நெட்வொர்க் அல்லது API பிழை வந்தால் பாதுகாப்பான பேக்கப் டேட்டா
    const fallbackData = {
      ...resumeData,
      fullName: resumeData?.fullName ? resumeData.fullName.toUpperCase() : "APPLICANT NAME",
      jobTitle: resumeData?.jobTitle || "Professional",
      location: resumeData?.location || "Tamil Nadu, India",
      summary: "Results-driven professional with proven experience, dedicated to operational excellence, process optimization, and sustainable organizational growth.",
      skills: "Operations Management, Team Leadership, Process Optimization, Strategic Planning, Stakeholder Management",
      experience: resumeData?.experience?.length ? resumeData.experience.map((exp) => ({
        ...exp,
        role: exp.role || "Specialist / Lead",
        company: exp.company || "Enterprise Solutions",
        period: exp.period || "Past Experience",
        desc: exp.desc || "Handled core operational responsibilities, improved workflow efficiency, and collaborated across cross-functional teams."
      })) : [
        {
          role: "Professional",
          company: "Enterprise Solutions",
          period: "Recent",
          desc: "Handled key operational tasks and contributed to measurable business growth."
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