import { IProduct } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { DeleteModalWindowPage } from '../../pages/modals/deleteModal.page.js';
import { ModalWindowPage } from '../../pages/modals/detailsModal.page.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import _ from 'lodash';

export class ProductsListService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private modalWindowPage = new ModalWindowPage(),
    private deleteModalWindowPage = new DeleteModalWindowPage()
  ) {}

  @logStep('Open add new product page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep('Get created product data')
  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }
  
  private async openDetails(productName: string) {
    await this.productsPage.clickOnDetailsButton(productName);
  }

  @logStep('Get product details info from modal window')
  async getCreatedProductDetails(productName: string) {
    await this.openDetails(productName);
    const productData = await this.modalWindowPage.getProductData();
    await this.modalWindowPage.closeByCross();
    return productData;
  }

  @logStep('Get toast message and close toast')
  async getNotificationAndClose() {
    const notification = await this.productsPage.getToastMessage();
    await this.productsPage.closeToastMessage();
    return notification;
  }

  @logStep('Delete created product')
  async deleteCreatedProduct(productName: string) {
    await this.productsPage.clickOnDeleteButton(productName);
    await this.deleteModalWindowPage.submitDelete();
  }

  @logStep('Validate product in table')
  async checkProductInTable(product: IProduct) {
    const actualProduct = await this.getCreatedProductData(product.name);
    const expectedProduct = _.pick(product, ['name', 'price', 'manufacturer']);
    expect(actualProduct).toMatchObject(expectedProduct);
  }

  @logStep('Validate product in modal window')
  async checkProductByModalData(product: IProduct) {
    const actualProduct = await this.getCreatedProductData(product.name);
    const expectedProductFromModal = _.omit(await this.getCreatedProductDetails(product.name), [
      'amount',
      'createdOn',
      'notes'
    ]);
    expect(actualProduct).toMatchObject(expectedProductFromModal);
  }
}
