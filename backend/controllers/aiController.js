const { generateFromGemini } = require('../services/geminiService');

const generateOutput = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const aiResponse = await generateFromGemini(prompt);

    res.status(200).json({
      success: true,
      fullOutput: aiResponse,
    });

  } catch (error) {
    console.error('AI Generation Error:', error.message);
    res.status(500).json({ success: false, message: 'AI generation failed' });
  }
};

module.exports = { generateOutput };
