const supabase = require("../services/supabase");
const { generateFromGemini } = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { conversationId, prompt, userId } = req.body;

    if (!prompt || !conversationId || !userId) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    // Fetch full message history for conversation
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    const aiResponse = await generateFromGemini(messages, prompt);

    // Insert user's message
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender: "user",
      message: prompt,
    });

    // Insert AI's response
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender: "ai",
      message: aiResponse,
    });

    res.status(200).json({
      success: true,
      aiResponse,
    });
  } catch (err) {
    console.error("AI Generation Error:", err.message);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
};

module.exports = { chatWithAI };
