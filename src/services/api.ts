import axios from 'axios';
import { Phone } from '../types/phone';

const API_BASE_URL = 'http://localhost:5000/api';

export const getPhoneRecommendations = async (): Promise<Phone[]> => {
  const response = await axios.get(`${API_BASE_URL}/recommendations`);
  return response.data;
};

export const getPhoneViability = async (phoneId: string): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/viability/${phoneId}`);
  return response.data.viability_years;
};