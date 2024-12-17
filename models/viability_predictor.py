import numpy as np
from sklearn.linear_regression import LinearRegression
import joblib
import os

class ViabilityPredictor:
    def __init__(self):
        self.model_path = 'models/saved/viability_model.joblib'
        self.scaler_path = 'models/saved/viability_scaler.joblib'
        
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
        else:
            self.train_model()
    
    def train_model(self):
        # Generate synthetic training data
        data = self._generate_training_data()
        
        # Prepare features and target
        X = data.drop('viability_years', axis=1)
        y = data['viability_years']
        
        # Scale features
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        # Train model
        self.model = LinearRegression()
        self.model.fit(X_scaled, y)
        
        # Save model
        os.makedirs('models/saved', exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
    
    def _generate_training_data(self):
        # Generate synthetic training data based on expert knowledge
        n_samples = 1000
        data = []
        
        for _ in range(n_samples):
            processor = round(np.random.uniform(1.8, 4.0), 1)
            ram = np.random.choice([4, 6, 8, 12, 16])
            storage = np.random.choice([64, 128, 256, 512, 1024])
            price = np.random.randint(10000, 150000)
            battery = np.random.randint(3000, 6000)
            
            # Calculate viability based on specs
            base_viability = 2.0  # Base 2 years
            
            # Add contributions from each spec
            processor_contrib = (processor - 1.8) / 2.2 * 0.5  # Up to 0.5 years
            ram_contrib = (ram - 4) / 12 * 0.5  # Up to 0.5 years
            storage_contrib = (np.log2(storage) - 6) / 4 * 0.4  # Up to 0.4 years
            price_contrib = (price - 10000) / 140000 * 0.4  # Up to 0.4 years
            battery_contrib = (battery - 3000) / 3000 * 0.2  # Up to 0.2 years
            
            viability = base_viability + processor_contrib + ram_contrib + \
                       storage_contrib + price_contrib + battery_contrib
            
            # Add some random noise
            viability += np.random.normal(0, 0.1)
            
            # Ensure viability is between 2 and 4 years
            viability = np.clip(viability, 2.0, 4.0)
            
            data.append({
                'processor': processor,
                'ram': ram,
                'storage': storage,
                'price': price,
                'battery': battery,
                'viability_years': round(viability, 1)
            })
        
        return pd.DataFrame(data)
    
    def predict_viability(self, phone):
        features = [[
            phone['specs']['processorGHz'],
            phone['specs']['ram'],
            phone['specs']['storageGB'],
            phone['price'],
            phone['specs']['batteryMAh']
        ]]
        
        # Scale features
        X = self.scaler.transform(features)
        
        # Predict and ensure output is between 2-4 years
        prediction = self.model.predict(X)[0]
        return round(np.clip(prediction, 2.0, 4.0), 1)