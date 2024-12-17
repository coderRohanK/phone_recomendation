import * as tf from '@tensorflow/tfjs';

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  timestamp: number;
}

export interface ModelVersion {
  version: string;
  timestamp: number;
  metrics: ModelMetrics;
  modelData: tf.Sequential;
}

export interface ModelConfig {
  modelName: string;
  version: string;
  inputShape: number[];
  layers: tf.layers.Layer[];
}