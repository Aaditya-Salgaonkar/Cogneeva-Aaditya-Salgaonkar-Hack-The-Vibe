router.patch('/update-title/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { prompt } = req.body;

    const { error } = await supabase
      .from('conversations')
      .update({ title: prompt })
      .eq('id', conversationId);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
