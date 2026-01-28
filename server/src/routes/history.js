const express = require('express');
const router = express.Router();
const History = require('../models/History');

router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const history = await History.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(20)
      .lean();

    res.json(history);
  } catch (err) {
    console.error('Failed to fetch history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.post('/history', async (req, res) => {
  try {
    const { user_id, code, language } = req.body;

    if (!user_id || !code || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newHistory = new History({
      user_id,
      code,
      language,
    });

    await newHistory.save();
    res.status(201).json({ message: 'History saved' });
  } catch (err) {
    console.error('Failed to save history:', err);
    res.status(500).json({ error: 'Failed to save history' });
  }
});

router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await History.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'History item not found' });
    }

    res.json({ message: 'History deleted' });
  } catch (err) {
    console.error('Failed to delete history:', err);
    res.status(500).json({ error: 'Failed to delete history' });
  }
});

module.exports = router;
