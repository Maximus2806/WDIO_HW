import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { LoginService } from '../../services/login/login.service.js';
import { ProductsListService } from '../../services/products/product.service.js';
import { HomeService } from '../../services/home/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { TOAST_MESSAGE } from '../../../data/types/toastMessage.types.js';
import _ from 'lodash';
import { SalesPortalService } from '../../services/salesPortal.service.js';
import { ProductsPage } from '../../pages/products/products.page.js';

describe('[UI] [Product] Smoke Login - Create -Verify - Delete', () => {
  const loginService = new LoginService();
  const homeService = new HomeService();
  const productsService = new ProductsListService();
  const addProductService = new AddProductService();
  const productsPage = new ProductsPage();
  const salesPortalService = new SalesPortalService(productsPage);

  before(async () => {
    await browser.maximizeWindow();
  });
  beforeEach(async () => {
    await loginService.openSalesPortal();
    await loginService.loginAsAdmin();
    await homeService.openProductsPage();
    await productsService.openAddNewProductPage();
  });

  afterEach(async () => {
    await loginService.signOut()
  })

  it('Test', async () => {
    const product = generateNewProduct();
    await addProductService.create(product);
    await salesPortalService.verifyNotification(TOAST_MESSAGE.CREATE_SUCCESS);
    // const actualCreatedProductDataFromModal = await productsService.getCreatedProductDetails(product.name);
    // const actualCreatedProductData = await productsService.getCreatedProductData(product.name);
    // expect(actualCreatedProductData).toMatchObject(
    //   _.omit(actualCreatedProductDataFromModal, ['amount', 'createdOn', 'notes'])
    // );
    //Replaced with new method from productService
    await productsService.checkProductByModalData(product);
    await productsService.deleteCreatedProduct(product.name);
    await salesPortalService.verifyNotification(TOAST_MESSAGE.DELETE_SUCCESS);
  });
});
