//backend/services/stressModelService.js

const ort = require('onnxruntime-node');
const fs = require('fs');
const path = require('path');

// Load emotion data
const emotionDataPath = path.join(__dirname, '../onnx-model/emotion_data.json');
const emotionData = JSON.parse(fs.readFileSync(emotionDataPath, 'utf-8'));
const { emotion_columns, emotion_groups } = emotionData;

// Load the ONNX model
const modelPath = path.join(__dirname, '../onnx-model/emotion_stress_model.onnx');
let session;

async function loadModel() {
  session = await ort.InferenceSession.create(modelPath);
  console.log("ONNX Model Loaded!");
}

// Run prediction
async function predict(inputs) {
  if (!session) await loadModel();
  
  // Convert inputs to tensor
  const inputTensor = {
    input_ids: new ort.Tensor('int64', inputs.input_ids.flat(), [1, 128]),
    attention_mask: new ort.Tensor('int64', inputs.attention_mask.flat(), [1, 128]),
    token_type_ids: new ort.Tensor('int64', inputs.token_type_ids.flat(), [1, 128]),
  };

  // Run inference
  const results = await session.run(inputTensor);

  // Extract outputs
  const emotionScores = results.emotion_logits.data;
  const happyScore = results.happy_score.data[0];
  const sadScore = results.sad_score.data[0];
  const neutralScore = results.neutral_score.data[0];
  const stressLevel = results.stress_level.data[0];

  return {
    emotions: emotionScores,
    happyScore,
    sadScore,
    neutralScore,
    stressLevel
  };
}

module.exports = { loadModel, predict, emotion_columns, emotion_groups };
