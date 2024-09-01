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

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }

  private async openDetails(productName: string) {
    await this.productsPage.clickOnDetailsButton(productName);
  }  

  async getCreatedProductDetails(productName: string) {
    await this.openDetails(productName);
    const productData = await this.modalWindowPage.getProductData();
    await this.modalWindowPage.closeByCross();
    return productData;
  }

  async getNotificationAndClose() {    
    const notification = await this.productsPage.getToastMessage();
    await this.productsPage.closeToastMessage();
    return notification;
  }

  async deleteCreatedProduct(productName: string) {
    await this.productsPage.clickOnDeleteButton(productName);
    await this.deleteModalWindowPage.submitDelete();
  }
}
