import { Phone } from '../types/phone';
import { ViabilityModel } from '../ml/models/ViabilityModel';

export const calculateViabilityYears = async (phone: Phone): Promise<number> => {
  const model = ViabilityModel.getInstance();
  return await model.predict(phone);
};

export const updateViabilityModel = async (phone: Phone, actualViability: number): Promise<void> => {
  const model = ViabilityModel.getInstance();
  await model.updateModel(phone, actualViability);
};