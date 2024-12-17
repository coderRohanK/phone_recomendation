import { Phone, UserPreferences } from '../types/phone';
import { RecommendationModel } from '../ml/models/RecommendationModel';

export const getRecommendations = async (
  phones: Phone[],
  preferences: UserPreferences
): Promise<Phone[]> => {
  // Filter phones by price range first
  const priceFilteredPhones = phones.filter(
    phone => phone.price >= preferences.minPrice && phone.price <= preferences.maxPrice
  );

  // Get ML-based recommendations
  const model = RecommendationModel.getInstance();
  return await model.predict(priceFilteredPhones, preferences);
};