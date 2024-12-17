import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///phones.db")
    ML_MODEL_PATH = os.getenv("ML_MODEL_PATH", "ml/models/")