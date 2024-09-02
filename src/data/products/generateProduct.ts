import { getRandomEnumValue } from '../../utils/enums/getRandomValue.js';
import { type IProduct, MANUFACTURERS } from '../types/product.types.js';
import { faker } from '@faker-js/faker';

export function generateNewProduct(productData?: Partial<IProduct>) {
  const productToCreate: IProduct = {
    // name: 'Test' + Date.now(),
    // replaced with alternative for generating randome names
    name: faker.commerce.product() + faker.number.int({min: 1, max: 100000}),
    price: 100,
    amount: 2,
    notes: 'Test notes',
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    ...productData
  };
  return productToCreate;
}