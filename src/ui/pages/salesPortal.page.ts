import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = '.spinner-border';
  protected readonly toast = '#toast .toast-body';
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }

  async waitForToastMessage() {
    await this.waitForElement(this.toast)    
  }
}