const express = require("express");
const router = express.Router();
const supabase = require("../services/supabase");
const { generateFromGemini } = require("../services/geminiService");

router.post("/", async (req, res) => {
  try {
    const { conversationId, prompt, userId } = req.body;

    if (!prompt || !conversationId || !userId) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    const aiResponse = await generateFromGemini(messages, prompt);

    await supabase.from("messages").insert([
      { conversation_id: conversationId, sender: "user", message: prompt },
      { conversation_id: conversationId, sender: "ai", message: aiResponse },
    ]);

    res.status(200).json({ success: true, aiResponse });
  } catch (err) {
    console.error("AI Generation Error:", err.message);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
});

module.exports = router;
