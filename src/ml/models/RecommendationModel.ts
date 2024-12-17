import * as tf from '@tensorflow/tfjs';
import { BaseModel } from './BaseModel';
import { Phone, UserPreferences } from '../../types/phone';

export class RecommendationModel extends BaseModel {
  private static instance: RecommendationModel | null = null;
  private isTraining: boolean = false;

  private constructor() {
    super('phone-recommendation-model');
  }

  public static getInstance(): RecommendationModel {
    if (!RecommendationModel.instance) {
      RecommendationModel.instance = new RecommendationModel();
    }
    return RecommendationModel.instance;
  }

  protected createModel(): tf.Sequential {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [11]
    }));
    
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu'
    }));
    
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));

    return model;
  }

  protected compileModel(model: tf.Sequential): void {
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });
  }

  private normalizeFeatures(phone: Phone, preferences: UserPreferences): tf.Tensor2D {
    const features = [
      phone.specs.cameraMP / 200,
      phone.specs.storageGB / 1024,
      phone.specs.processorGHz / 4,
      phone.specs.batteryMAh / 6000,
      phone.specs.ram / 16,
      phone.price / 200000,
      preferences.camera / 5,
      preferences.storage / 5,
      preferences.processor / 5,
      preferences.battery / 5,
      (preferences.maxPrice - preferences.minPrice) / 200000
    ];
    return tf.tensor2d([features], [1, 11]);
  }

  public async predict(phones: Phone[], preferences: UserPreferences): Promise<Phone[]> {
    if (!this.model) {
      this.model = await this.loadOrCreateModel();
    }

    const predictions = await Promise.all(
      phones.map(async (phone) => {
        const features = this.normalizeFeatures(phone, preferences);
        const prediction = this.model!.predict(features) as tf.Tensor;
        const score = (await prediction.data())[0];
        
        features.dispose();
        prediction.dispose();
        
        return { phone, score };
      })
    );

    return predictions
      .sort((a, b) => b.score - a.score)
      .map(({ phone }) => phone);
  }

  public async updateModel(phone: Phone, preferences: UserPreferences, liked: boolean): Promise<void> {
    if (this.isTraining) return;
    this.isTraining = true;

    try {
      if (!this.model) {
        this.model = await this.loadOrCreateModel();
      }

      const features = this.normalizeFeatures(phone, preferences);
      const labels = tf.tensor2d([[liked ? 1 : 0]], [1, 1]);

      await this.model.fit(features, labels, {
        epochs: 1,
        batchSize: 1,
        verbose: 0
      });

      await this.saveModel();

      features.dispose();
      labels.dispose();
    } finally {
      this.isTraining = false;
    }
  }
}