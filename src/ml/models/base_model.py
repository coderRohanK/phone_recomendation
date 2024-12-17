import os
import joblib
from sklearn.preprocessing import StandardScaler

class BaseModel:
    def __init__(self, model_name: str):
        self.model_dir = 'src/ml/saved'
        self.model_path = f'{self.model_dir}/{model_name}_model.joblib'
        self.scaler_path = f'{self.model_dir}/{model_name}_scaler.joblib'
        
        os.makedirs(self.model_dir, exist_ok=True)
        
    def _load_or_train(self, train_func):
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
        else:
            train_func()
            
    def _save_model(self):
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)