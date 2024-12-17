from ..models.phone_recommender import PhoneRecommender
from ..models.viability_predictor import ViabilityPredictor

class ModelInterface:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.recommender = PhoneRecommender()
            cls._instance.viability = ViabilityPredictor()
        return cls._instance
    
    def get_recommendations(self, phones, preferences):
        return self.recommender.get_recommendations(phones, preferences)
    
    def predict_viability(self, phone):
        return self.viability.predict_viability(phone)