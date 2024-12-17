import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

class PhoneRecommender:
    def __init__(self):
        self.rf_model_path = 'models/saved/random_forest.joblib'
        self.knn_model_path = 'models/saved/knn.joblib'
        self.scaler_path = 'models/saved/scaler.joblib'
        
        # Load or train models
        if os.path.exists(self.rf_model_path):
            self.rf_model = joblib.load(self.rf_model_path)
            self.knn_model = joblib.load(self.knn_model_path)
            self.scaler = joblib.load(self.scaler_path)
        else:
            self.train_models()

    def train_models(self):
        # Create synthetic training data based on expert knowledge
        data = self._generate_training_data()
        
        # Prepare features and target
        X = data.drop('suitable', axis=1)
        y = data['suitable']
        
        # Scale features
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        # Train Random Forest
        self.rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.rf_model.fit(X_scaled, y)
        
        # Train KNN
        self.knn_model = KNeighborsClassifier(n_neighbors=5)
        self.knn_model.fit(X_scaled, y)
        
        # Save models
        os.makedirs('models/saved', exist_ok=True)
        joblib.dump(self.rf_model, self.rf_model_path)
        joblib.dump(self.knn_model, self.knn_model_path)
        joblib.dump(self.scaler, self.scaler_path)

    def _generate_training_data(self):
        # Generate synthetic training data based on expert knowledge
        n_samples = 1000
        data = []
        
        for _ in range(n_samples):
            # Generate random phone specs
            camera = np.random.randint(12, 200)
            storage = np.random.choice([64, 128, 256, 512, 1024])
            processor = round(np.random.uniform(1.8, 4.0), 1)
            battery = np.random.randint(3000, 6000)
            ram = np.random.choice([4, 6, 8, 12, 16])
            price = np.random.randint(10000, 150000)
            
            # Generate user preferences
            pref_camera = np.random.randint(1, 6)
            pref_storage = np.random.randint(1, 6)
            pref_processor = np.random.randint(1, 6)
            pref_battery = np.random.randint(1, 6)
            pref_price_min = np.random.randint(10000, 100000)
            pref_price_max = pref_price_min + np.random.randint(10000, 50000)
            
            # Determine if phone is suitable based on expert rules
            suitable = (
                (camera >= 48 if pref_camera >= 4 else camera >= 12) and
                (storage >= 256 if pref_storage >= 4 else storage >= 64) and
                (processor >= 2.5 if pref_processor >= 4 else processor >= 1.8) and
                (battery >= 4500 if pref_battery >= 4 else battery >= 3000) and
                (price >= pref_price_min and price <= pref_price_max)
            )
            
            data.append({
                'camera': camera,
                'storage': storage,
                'processor': processor,
                'battery': battery,
                'ram': ram,
                'price': price,
                'pref_camera': pref_camera,
                'pref_storage': pref_storage,
                'pref_processor': pref_processor,
                'pref_battery': pref_battery,
                'pref_price_min': pref_price_min,
                'pref_price_max': pref_price_max,
                'suitable': 1 if suitable else 0
            })
        
        return pd.DataFrame(data)

    def get_recommendations(self, phones, preferences):
        # Prepare features for each phone
        features = []
        for phone in phones:
            features.append([
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
            ])
        
        # Scale features
        X = self.scaler.transform(features)
        
        # Get predictions from both models
        rf_pred = self.rf_model.predict_proba(X)[:, 1]
        knn_pred = self.knn_model.predict_proba(X)[:, 1]
        
        # Combine predictions (weighted average)
        final_scores = 0.7 * rf_pred + 0.3 * knn_pred
        
        # Sort phones by score
        phone_scores = list(zip(phones, final_scores))
        sorted_phones = sorted(phone_scores, key=lambda x: x[1], reverse=True)
        
        return [phone for phone, _ in sorted_phones]