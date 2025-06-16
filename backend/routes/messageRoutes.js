// routes/messagesRoutes.js

const express = require('express');
const router = express.Router();
const supabase = require('../services/supabase');

// Get messages for conversation
router.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json({ success: true, messages: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch messages." });
  }
});

module.exports = router;
