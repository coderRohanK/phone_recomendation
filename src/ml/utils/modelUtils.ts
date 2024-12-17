import * as tf from '@tensorflow/tfjs';
import { ModelMetrics } from '../types/model';

export function calculateMetrics(
  predictions: tf.Tensor,
  labels: tf.Tensor
): ModelMetrics {
  const predArray = predictions.dataSync();
  const labelArray = labels.dataSync();

  let truePositives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;
  let correctPredictions = 0;

  for (let i = 0; i < predArray.length; i++) {
    const pred = Math.round(predArray[i]);
    const label = labelArray[i];

    if (pred === label) correctPredictions++;
    if (pred === 1 && label === 1) truePositives++;
    if (pred === 1 && label === 0) falsePositives++;
    if (pred === 0 && label === 1) falseNegatives++;
  }

  const accuracy = correctPredictions / predArray.length;
  const precision = truePositives / (truePositives + falsePositives) || 0;
  const recall = truePositives / (truePositives + falseNegatives) || 0;
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0;

  return {
    accuracy,
    precision,
    recall,
    f1Score,
    timestamp: Date.now()
  };
}

export function normalizeFeatures(features: number[][]): tf.Tensor2D {
  const featureTensor = tf.tensor2d(features);
  const { mean, variance } = tf.moments(featureTensor, 0);
  const normalized = featureTensor.sub(mean).div(variance.sqrt());
  
  featureTensor.dispose();
  mean.dispose();
  variance.dispose();
  
  return normalized;
}

export async function evaluateModel(
  model: tf.Sequential,
  testFeatures: tf.Tensor2D,
  testLabels: tf.Tensor2D
): Promise<ModelMetrics> {
  const predictions = model.predict(testFeatures) as tf.Tensor;
  const metrics = calculateMetrics(predictions, testLabels);
  
  predictions.dispose();
  
  return metrics;
}