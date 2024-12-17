import { Phone } from '../types/phone';
import { applePhones } from './manufacturers/apple';
import { samsungPhones } from './manufacturers/samsung';
import { xiaomiPhones } from './manufacturers/xiaomi';
import { oneplusPhones } from './manufacturers/oneplus';
import { googlePhones } from './manufacturers/google';
import { motorolaPhones } from './manufacturers/motorola';
import { oppoPhones } from './manufacturers/oppo';
import { vivoPhones } from './manufacturers/vivo';

// Combine all phone data including Oppo and Vivo
export const phones: Phone[] = [
  ...applePhones,
  ...samsungPhones,
  ...xiaomiPhones,
  ...oneplusPhones,
  ...googlePhones,
  ...motorolaPhones, // Add Motorola phones here
  ...oppoPhones, // Add Oppo phones here
  ...vivoPhones, // Add Vivo phones here
];

// Export individual manufacturer collections for filtered views
export {
  applePhones,
  samsungPhones,
  xiaomiPhones,
  oneplusPhones,
  googlePhones,
  motorolaPhones, // Export motorolaPhones for individual use
  oppoPhones, // Export oppoPhones for individual use
  vivoPhones, // Export vivoPhones for individual use
};
