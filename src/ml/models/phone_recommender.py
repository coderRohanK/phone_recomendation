import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from .base_model import BaseModel
from ..utils.data_generator import generate_recommendation_data

class PhoneRecommender(BaseModel):
    def __init__(self):
        super().__init__('recommender')
        self._load_or_train(self._train_models)
        
    def _train_models(self):
        data = generate_recommendation_data()
        
        X = data.drop('suitable', axis=1)
        y = data['suitable']
        
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        self.rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.knn_model = KNeighborsClassifier(n_neighbors=5)
        
        self.rf_model.fit(X_scaled, y)
        self.knn_model.fit(X_scaled, y)
        
        self.model = {'rf': self.rf_model, 'knn': self.knn_model}
        self._save_model()
        
    def get_recommendations(self, phones, preferences):
        features = self._prepare_features(phones, preferences)
        X = self.scaler.transform(features)
        
        rf_pred = self.model['rf'].predict_proba(X)[:, 1]
        knn_pred = self.model['knn'].predict_proba(X)[:, 1]
        
        final_scores = 0.7 * rf_pred + 0.3 * knn_pred
        
        return [p for p, _ in sorted(zip(phones, final_scores), key=lambda x: x[1], reverse=True)]
    
    def _prepare_features(self, phones, preferences):
        return [[
            phone['specs']['cameraMP'],
            phone['specs']['storageGB'],
            phone['specs']['processorGHz'],
            phone['specs']['batteryMAh'],
            phone['specs']['ram'],
            phone['price'],
            preferences['camera'],
            preferences['storage'],
            preferences['processor'],
            preferences['battery'],
            preferences['minPrice'],
            preferences['maxPrice']
        ] for phone in phones]