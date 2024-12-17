import numpy as np
import pandas as pd

def generate_recommendation_data(n_samples=1000):
    data = []
    
    for _ in range(n_samples):
        camera = np.random.randint(12, 200)
        storage = np.random.choice([64, 128, 256, 512, 1024])
        processor = round(np.random.uniform(1.8, 4.0), 1)
        battery = np.random.randint(3000, 6000)
        ram = np.random.choice([4, 6, 8, 12, 16])
        price = np.random.randint(10000, 150000)
        
        pref_camera = np.random.randint(1, 6)
        pref_storage = np.random.randint(1, 6)
        pref_processor = np.random.randint(1, 6)
        pref_battery = np.random.randint(1, 6)
        pref_price_min = np.random.randint(10000, 100000)
        pref_price_max = pref_price_min + np.random.randint(10000, 50000)
        
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

def generate_viability_data(n_samples=1000):
    data = []
    
    for _ in range(n_samples):
        processor = round(np.random.uniform(1.8, 4.0), 1)
        ram = np.random.choice([4, 6, 8, 12, 16])
        storage = np.random.choice([64, 128, 256, 512, 1024])
        price = np.random.randint(10000, 150000)
        battery = np.random.randint(3000, 6000)
        
        base_viability = 2.0
        processor_contrib = (processor - 1.8) / 2.2 * 0.5
        ram_contrib = (ram - 4) / 12 * 0.5
        storage_contrib = (np.log2(storage) - 6) / 4 * 0.4
        price_contrib = (price - 10000) / 140000 * 0.4
        battery_contrib = (battery - 3000) / 3000 * 0.2
        
        viability = base_viability + processor_contrib + ram_contrib + \
                   storage_contrib + price_contrib + battery_contrib
        
        viability += np.random.normal(0, 0.1)
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