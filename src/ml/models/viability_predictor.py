import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from .base_model import BaseModel
from ..utils.data_generator import generate_viability_data

class ViabilityPredictor(BaseModel):
    def __init__(self):
        super().__init__('viability')
        self._load_or_train(self._train_model)
    
    def _train_model(self):
        data = generate_viability_data()
        
        X = data.drop('viability_years', axis=1)
        y = data['viability_years']
        
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        self.model = LinearRegression()
        self.model.fit(X_scaled, y)
        
        self._save_model()
    
    def predict_viability(self, phone):
        features = self._prepare_features(phone)
        X = self.scaler.transform(features)
        prediction = self.model.predict(X)[0]
        return round(np.clip(prediction, 2.0, 4.0), 1)
    
    def _prepare_features(self, phone):
        return [[
            phone['specs']['processorGHz'],
            phone['specs']['ram'],
            phone['specs']['storageGB'],
            phone['price'],
            phone['specs']['batteryMAh']
        ]]