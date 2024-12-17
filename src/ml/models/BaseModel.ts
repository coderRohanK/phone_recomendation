import * as tf from '@tensorflow/tfjs';

export abstract class BaseModel {
  protected model: tf.Sequential | null = null;
  protected modelPath: string;

  constructor(modelPath: string) {
    this.modelPath = modelPath;
  }

  protected async loadOrCreateModel(): Promise<tf.Sequential> {
    try {
      this.model = await tf.loadLayersModel(`localstorage://${this.modelPath}`);
      console.log('Loaded existing model');
      this.compileModel(this.model);
      return this.model;
    } catch (error) {
      console.log('Creating new model');
      this.model = this.createModel();
      this.compileModel(this.model);
      await this.saveModel();
      return this.model;
    }
  }

  protected abstract createModel(): tf.Sequential;
  protected abstract compileModel(model: tf.Sequential): void;

  protected async saveModel(): Promise<void> {
    if (this.model) {
      await this.model.save(`localstorage://${this.modelPath}`);
    }
  }

  public dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
  }
}