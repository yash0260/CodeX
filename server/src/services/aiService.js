const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

class AIService {
  async analyzeAll(code, language, complexity, parsedData) {
    try {
const prompt = `
You are an expert software engineer. Analyze this ${language} code.

Calculate Code Quality Score (0-100) based on this rubric:

1. Time Complexity (30 points):
   - O(1), O(log n): 30 points
   - O(n): 25 points
   - O(n log n): 20 points
   - O(n²): 15 points
   - O(2^n) or worse: 5 points

2. Space Complexity (20 points):
   - O(1): 20 points
   - O(log n): 18 points
   - O(n): 15 points
   - O(n²): 10 points
   - Worse: 5 points

3. Code Readability (20 points):
   - Clear variable names: 5 points
   - Proper indentation: 5 points
   - Meaningful function names: 5 points
   - Comments where needed: 5 points

4. Best Practices (15 points):
   - Follows language conventions: 5 points
   - No code duplication: 5 points
   - Proper error handling: 5 points

5. Maintainability (15 points):
   - Modular code structure: 5 points
   - Low cyclomatic complexity (<10): 5 points
   - Easy to extend: 5 points

Return ONLY valid JSON:
{
  "explanation": "what the code does",
  "complexity": {
    "time": "O(n*m) - iterates through 2D array",
    "space": "O(n*m) - stores DP table",
    "cyclomatic": {"value": 6, "rating": "Medium"},
    "qualityScore": 75,
    "readability": 4,
    "efficiency": 3,
    "maintainability": 4
  },
  "algorithms": {
    "detected": [{"name": "Dynamic Programming", "confidence": "High"}],
    "details": "Uses memoization with 2D DP table"
  },
  "optimizations": "specific suggestions",
  "bestPractices": "recommendations",
  "security": "security notes or None",
  "scoreBreakdown": {
    "timeComplexity": 20,
    "spaceComplexity": 15,
    "readability": 18,
    "bestPractices": 12,
    "maintainability": 10
  }
}

Code:
${code}
`;


      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      let parsed;
      try {
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        parsed = JSON.parse(cleanText);
      } catch (e) {
        console.error('JSON parse error:', e);
        parsed = {
          explanation: text,
          complexity: {
            time: 'O(n)',
            space: 'O(1)',
            cyclomatic: { value: 5, rating: 'Low' },
            qualityScore: 75,
            readability: 3,
            efficiency: 3,
            maintainability: 3
          },
          algorithms: {
            detected: [],
            summary: '',
            details: ''
          },
          optimizations: '',
          errors: '',
          bestPractices: '',
          security: 'None'
        };
      }

      return parsed;
    } catch (error) {
      throw new Error(
        /401|403|quota|billing|rate limit|429/i.test(error.message || '')
          ? 'Gemini API error (auth/billing/rate limit). Check your API key or quota.'
          : `AI analysis failed: ${error.message}`
      );
    }
  }
}

module.exports = new AIService();
