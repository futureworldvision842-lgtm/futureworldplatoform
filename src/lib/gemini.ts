import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function chatWithAI(message: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `You are the G.A.I.G.S. AI Assistant - the Global AI-Powered Governance System's intelligent aide. 
You help citizens, society admins, city admins, country admins, and global admins with:
- Governance decisions and policy analysis
- Understanding transparent financial systems
- Community management and conflict resolution
- Scientific problem-solving
- Platform navigation and features
- Democratic participation guidance

You embody principles of justice, transparency, compassion, and unity.
Always provide balanced, ethical, and well-reasoned responses.
${context ? `\nContext: ${context}` : ""}`;

    const result = await geminiModel.generateContent([systemPrompt, message]);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I apologize, but I'm experiencing a temporary issue. Please try again in a moment.";
  }
}

export async function analyzePolicy(proposal: {
  title: string;
  description: string;
  level: string;
}): Promise<string> {
  try {
    const prompt = `As the G.A.I.G.S. AI Policy Analyst, analyze the following governance proposal:

Title: ${proposal.title}
Description: ${proposal.description}
Level: ${proposal.level}

Provide a comprehensive analysis including:
1. **Impact Assessment**: Economic, social, and environmental impacts
2. **Stakeholder Analysis**: Who benefits and who might be affected
3. **Risk Assessment**: Potential risks and mitigation strategies
4. **Implementation Feasibility**: Practical considerations
5. **Ethical Review**: Alignment with principles of justice, transparency, and compassion
6. **Recommendation**: Overall recommendation with confidence score (1-10)

Format the response clearly with sections.`;

    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Policy Analysis Error:", error);
    return "Unable to analyze policy at this time. Please try again later.";
  }
}

export async function detectAnomalies(transactions: Array<{
  amount: number;
  type: string;
  description: string;
}>): Promise<string> {
  try {
    const prompt = `As the G.A.I.G.S. AI Transparency Monitor, analyze these financial transactions for any anomalies or suspicious patterns:

${JSON.stringify(transactions, null, 2)}

Check for:
1. Unusual transaction amounts
2. Suspicious patterns or frequencies
3. Potential misuse of funds
4. Recommendations for improved transparency

Provide a clear, actionable report.`;

    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Anomaly Detection Error:", error);
    return "Unable to perform anomaly detection at this time.";
  }
}

export async function generateInsights(data: {
  type: string;
  metrics: Record<string, number>;
}): Promise<string> {
  try {
    const prompt = `As the G.A.I.G.S. AI Insights Engine, generate governance insights from this data:

Type: ${data.type}
Metrics: ${JSON.stringify(data.metrics, null, 2)}

Provide:
1. Key observations
2. Trends identified
3. Actionable recommendations
4. Risk alerts (if any)

Keep the response concise and actionable.`;

    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Insights Generation Error:", error);
    return "Unable to generate insights at this time.";
  }
}
