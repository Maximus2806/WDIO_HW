import { ModalWindowPage } from '../../pages/modals/detailsModal.page.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import _ from 'lodash';

export class ProductsListService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private modalWindowPage = new ModalWindowPage()
  ) {}

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }

  private async openCreatedProductDetails(productName: string) {
    await this.productsPage.clickOnDetailsButton(productName);
  }

  private async closeCreatedProductDetails() {
    await this.modalWindowPage.closeByCross();
  }

  async getCreatedProductDetails(productName: string) {
    await this.openCreatedProductDetails(productName);
    const productData = await this.modalWindowPage.getProductData();
    await this.closeCreatedProductDetails();
    return productData;
  }

  async getNotification() {
    await this.productsPage.waitForToastMessage();
    const notification = await this.productsPage.getToastMessage();
    return notification;
  }

  async closeNotification() {
    await this.productsPage.closeToastMessage();
  }

  async deleteCreatedProduct(productName: string) {
    await this.productsPage.clickOnDeleteButton(productName);
    await this.modalWindowPage.submit()
  }
}
