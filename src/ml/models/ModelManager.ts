import * as tf from '@tensorflow/tfjs';
import { ModelStorage } from '../storage/ModelStorage';
import { MetricsTracker } from '../metrics/MetricsTracker';
import { ModelConfig, ModelMetrics } from '../types/model';

export class ModelManager {
  private static instance: ModelManager;
  private storage: ModelStorage;
  private metricsTracker: MetricsTracker;
  private currentModel: tf.Sequential | null = null;
  private currentVersion: string | null = null;

  private constructor() {
    this.storage = ModelStorage.getInstance();
    this.metricsTracker = MetricsTracker.getInstance();
  }

  public static getInstance(): ModelManager {
    if (!ModelManager.instance) {
      ModelManager.instance = new ModelManager();
    }
    return ModelManager.instance;
  }

  async initializeModel(config: ModelConfig): Promise<void> {
    // Try to load existing model
    this.currentModel = await this.storage.loadModel(config.modelName);

    if (!this.currentModel) {
      // Create new model if none exists
      this.currentModel = this.createModel(config);
      await this.saveCurrentModel(config.modelName, {
        accuracy: 0,
        precision: 0,
        recall: 0,
        f1Score: 0,
        timestamp: Date.now()
      });
    }
  }

  private createModel(config: ModelConfig): tf.Sequential {
    const model = tf.sequential();
    
    config.layers.forEach(layer => {
      model.add(layer);
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  async saveCurrentModel(modelName: string, metrics: ModelMetrics): Promise<void> {
    if (!this.currentModel) throw new Error('No model to save');
    
    this.currentVersion = await this.storage.saveModel(
      modelName,
      this.currentModel,
      metrics
    );
  }

  async rollback(modelName: string, targetVersion?: string): Promise<void> {
    const versions = await this.storage.getAllVersions(modelName);
    
    if (!targetVersion) {
      // Roll back to previous version
      const currentIndex = versions.indexOf(this.currentVersion!);
      if (currentIndex > 0) {
        targetVersion = versions[currentIndex - 1];
      }
    }

    if (targetVersion) {
      this.currentModel = await this.storage.loadModel(modelName, targetVersion);
      this.currentVersion = targetVersion;
    }
  }

  async checkPerformance(modelName: string, currentMetrics: ModelMetrics): Promise<boolean> {
    const threshold = 0.1; // 10% performance drop
    const previousMetrics = await this.storage.getMetrics(modelName, this.currentVersion!);

    if (previousMetrics && currentMetrics.accuracy < previousMetrics.accuracy - threshold) {
      await this.rollback(modelName);
      return true;
    }

    return false;
  }

  getCurrentModel(): tf.Sequential | null {
    return this.currentModel;
  }

  getCurrentVersion(): string | null {
    return this.currentVersion;
  }
}