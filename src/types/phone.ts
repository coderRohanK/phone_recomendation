export interface PhoneSpecs {
  cameraMP: number;
  storageGB: number;
  processorGHz: number;
  batteryMAh: number;
  ram: number;
  display: {
    size: number;
    resolution: string;
    type: string;
  };
}

export interface ShopLinks {
  amazon: string;
  flipkart: string;
}

export interface Phone {
  id: string;
  name: string;
  company: string;
  price: number;
  camera: number;
  storage: number;
  processor: number;
  battery: number;
  specs: PhoneSpecs;
  shopLinks: ShopLinks;
}

export interface UserPreferences {
  camera: number;
  storage: number;
  processor: number;
  battery: number;
  minPrice: number;
  maxPrice: number;
}