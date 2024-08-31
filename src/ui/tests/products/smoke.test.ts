import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { LoginService } from '../../services/login/login.service.js';
import { ProductsListService } from '../../services/products/product.service.js';
import { HomeService } from '../../services/home/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { TOAST_MESSAGE } from '../../../data/types/toastMessage.types.js';
import _ from 'lodash';

describe('[UI] [Product] Smoke Login - Create -Verify - Delete', () => {
  const loginService = new LoginService();
  const homeService = new HomeService();
  const productsService = new ProductsListService();
  const addProductService = new AddProductService();

  before(async () => {
    await browser.maximizeWindow();
  });
  beforeEach(async () => {
    await browser.url(`${process.env.BASE_URL}`);
    await loginService.loginAsAdmin();
    await homeService.openProductsPage();
    await productsService.openAddNewProductPage();    
  });

  it('Test', async () => {
    const product = generateNewProduct();
    await addProductService.create(product);
    const actualCreateNotification = await productsService.getNotification();
    const expectedCreateNotification = TOAST_MESSAGE.CREATE_SUCCESS;
    expect(actualCreateNotification).toBe(expectedCreateNotification);
    await productsService.closeNotification();
    const actualCreatedProductDataFromModal = await productsService.getCreatedProductDetails(product.name);
    const actualCreatedProductData = await productsService.getCreatedProductData(product.name);
    expect(actualCreatedProductData).toMatchObject(
      _.omit(actualCreatedProductDataFromModal, ['amount', 'createdOn', 'notes'])
    );
    await productsService.deleteCreatedProduct(product.name);
    const actualDeleteNotification = await productsService.getNotification();
    const expectedDeleteNotification = TOAST_MESSAGE.DELETE_SUCCESS;
    expect(actualDeleteNotification).toBe(expectedDeleteNotification);   
    await productsService.closeNotification();
  });
});


