//backend/routes/stressRoutes.js

const express = require('express');
const router = express.Router();
const { predict } = require('../services/stressModelService');

router.post('/predict-stress', async (req, res) => {
  const inputs = req.body;

  try {
    const result = await predict(inputs);
    res.json(result);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = router;
