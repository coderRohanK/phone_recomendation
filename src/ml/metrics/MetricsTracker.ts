import { ModelMetrics } from '../types/model';
import { ModelStorage } from '../storage/ModelStorage';

export class MetricsTracker {
  private static instance: MetricsTracker;
  private storage: ModelStorage;

  private constructor() {
    this.storage = ModelStorage.getInstance();
  }

  public static getInstance(): MetricsTracker {
    if (!MetricsTracker.instance) {
      MetricsTracker.instance = new MetricsTracker();
    }
    return MetricsTracker.instance;
  }

  async trackMetrics(modelName: string, version: string, metrics: ModelMetrics): Promise<void> {
    await this.storage.saveModel(modelName, metrics.modelData, {
      accuracy: metrics.accuracy,
      precision: metrics.precision,
      recall: metrics.recall,
      f1Score: metrics.f1Score,
      timestamp: Date.now()
    });
  }

  async getMetricsHistory(modelName: string): Promise<ModelMetrics[]> {
    const versions = await this.storage.getAllVersions(modelName);
    const metrics: ModelMetrics[] = [];

    for (const version of versions) {
      const metric = await this.storage.getMetrics(modelName, version);
      if (metric) metrics.push(metric);
    }

    return metrics.sort((a, b) => b.timestamp - a.timestamp);
  }

  async compareVersions(modelName: string, version1: string, version2: string): Promise<{
    accuracyDiff: number;
    precisionDiff: number;
    recallDiff: number;
    f1ScoreDiff: number;
  }> {
    const metrics1 = await this.storage.getMetrics(modelName, version1);
    const metrics2 = await this.storage.getMetrics(modelName, version2);

    if (!metrics1 || !metrics2) {
      throw new Error('Metrics not found for one or both versions');
    }

    return {
      accuracyDiff: metrics2.accuracy - metrics1.accuracy,
      precisionDiff: metrics2.precision - metrics1.precision,
      recallDiff: metrics2.recall - metrics1.recall,
      f1ScoreDiff: metrics2.f1Score - metrics1.f1Score
    };
  }
}