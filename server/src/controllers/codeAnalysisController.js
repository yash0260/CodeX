const aiService = require('../services/aiService');

exports.analyzeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    const safeCode = typeof code === 'string' ? code : '';
    const aiResult = await aiService.analyzeAll(safeCode, language);
    const result = {
      explanation: aiResult.explanation,
      complexity: {
        time: aiResult.complexity.time,
        space: aiResult.complexity.space,
        cyclomatic: aiResult.complexity.cyclomatic,
        qualityScore: aiResult.complexity.qualityScore,
        readability: aiResult.complexity.readability,
        efficiency: aiResult.complexity.efficiency,
        maintainability: aiResult.complexity.maintainability,
      },
      algorithms: {
        detected: aiResult.algorithms.detected,
        details: aiResult.algorithms.details,
      },
      optimizations: aiResult.optimizations,
      errors: [],
      bestPractices: aiResult.bestPractices,
      security: aiResult.security,
      language,
    };

    res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed. Please check your code and try again.' 
    });
  }
};
