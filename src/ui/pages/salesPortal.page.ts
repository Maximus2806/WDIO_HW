import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = '.spinner-border';
  protected readonly toast = '#toast .toast-body';
  protected readonly 'Add New Product button' = 'button.page-title-header';
  protected readonly 'Close toast message' = '.d-flex button[title="Close"]';
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }
  //Trying to rework toast verification(now doublicates methods from product page)

  async getToastMessage() {
    const toastMessage = await this.getText(this.toast);
    return toastMessage;
  }

  async closeToastMessage() {
    await this.click(this['Close toast message']);
  }
}
