import * as tf from '@tensorflow/tfjs';
import { BaseModel } from './BaseModel';
import { Phone } from '../../types/phone';

export class ViabilityModel extends BaseModel {
  private static instance: ViabilityModel | null = null;
  private isTraining: boolean = false;

  private constructor() {
    super('phone-viability-model');
  }

  public static getInstance(): ViabilityModel {
    if (!ViabilityModel.instance) {
      ViabilityModel.instance = new ViabilityModel();
    }
    return ViabilityModel.instance;
  }

  protected createModel(): tf.Sequential {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
      inputShape: [5]
    }));
    
    model.add(tf.layers.dense({
      units: 16,
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
      loss: 'meanSquaredError'
    });
  }

  private normalizeFeatures(phone: Phone): tf.Tensor2D {
    const features = [
      phone.specs.processorGHz / 4,
      phone.specs.ram / 16,
      phone.specs.storageGB / 1024,
      phone.price / 200000,
      phone.specs.batteryMAh / 6000
    ];
    return tf.tensor2d([features], [1, 5]);
  }

  public async predict(phone: Phone): Promise<number> {
    if (!this.model) {
      this.model = await this.loadOrCreateModel();
    }

    const features = this.normalizeFeatures(phone);
    const prediction = this.model.predict(features) as tf.Tensor;
    const value = await prediction.data();
    
    features.dispose();
    prediction.dispose();

    // Convert to years (2-4 years range) and round to 1 decimal place
    return Number((2 + (value[0] * 2)).toFixed(1));
  }

  public async updateModel(phone: Phone, actualViability: number): Promise<void> {
    if (this.isTraining) return;
    this.isTraining = true;

    try {
      if (!this.model) {
        this.model = await this.loadOrCreateModel();
      }

      const features = this.normalizeFeatures(phone);
      const labels = tf.tensor2d([[actualViability]], [1, 1]);

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