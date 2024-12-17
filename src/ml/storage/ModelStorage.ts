import { openDB, IDBPDatabase } from 'idb';
import { ModelVersion, ModelMetrics } from '../types/model';
import * as tf from '@tensorflow/tfjs';

export class ModelStorage {
  private static instance: ModelStorage;
  private db: IDBPDatabase | null = null;

  private constructor() {}

  public static getInstance(): ModelStorage {
    if (!ModelStorage.instance) {
      ModelStorage.instance = new ModelStorage();
    }
    return ModelStorage.instance;
  }

  private async initDB() {
    if (!this.db) {
      this.db = await openDB('ml-models', 1, {
        upgrade(db) {
          db.createObjectStore('models');
          db.createObjectStore('metrics');
        },
      });
    }
  }

  async saveModel(modelName: string, model: tf.Sequential, metrics: ModelMetrics): Promise<string> {
    await this.initDB();
    const version = new Date().toISOString();
    
    // Save model
    const modelData = await model.save(tf.io.withSaveHandler(async (artifacts) => {
      await this.db!.put('models', artifacts, `${modelName}-${version}`);
      return {};
    }));

    // Save metrics
    await this.db!.put('metrics', {
      ...metrics,
      timestamp: Date.now()
    }, `${modelName}-${version}`);

    return version;
  }

  async loadModel(modelName: string, version?: string): Promise<tf.Sequential | null> {
    await this.initDB();
    
    if (!version) {
      // Get latest version
      const versions = await this.db!.getAllKeys('models');
      const latestVersion = versions
        .filter(key => key.toString().startsWith(modelName))
        .sort()
        .pop();
      version = latestVersion?.toString().split('-')[1];
    }

    if (!version) return null;

    const modelData = await this.db!.get('models', `${modelName}-${version}`);
    if (!modelData) return null;

    return await tf.loadLayersModel(tf.io.fromMemory(modelData));
  }

  async getMetrics(modelName: string, version: string): Promise<ModelMetrics | null> {
    await this.initDB();
    return await this.db!.get('metrics', `${modelName}-${version}`);
  }

  async getAllVersions(modelName: string): Promise<string[]> {
    await this.initDB();
    const versions = await this.db!.getAllKeys('models');
    return versions
      .filter(key => key.toString().startsWith(modelName))
      .map(key => key.toString().split('-')[1]);
  }
}