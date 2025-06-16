const express = require('express');
const supabase = require('../services/supabase');
const router = express.Router();

router.post('/start', async (req, res) => {
  const { userId } = req.body;

  console.log("Received userId:", userId);  // Add this log

  try {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ user_id: userId, title: "New Chat" }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Conversation created:", data);

    res.status(200).json({ conversationId: data[0].id });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATED LIST ROUTE
router.get('/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Now enrich with first user message for each conversation
    const enrichedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const { data: firstMessage, error: msgError } = await supabase
          .from('messages')
          .select('message')
          .eq('conversation_id', conv.id)
          .eq('sender', 'user')
          .order('created_at', { ascending: true })
          .limit(1)
          .single();

        return {
          ...conv,
          prompt: firstMessage?.message || "(no message)"
        };
      })
    );

    res.json({ success: true, conversations: enrichedConversations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
