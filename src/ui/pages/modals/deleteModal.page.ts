import { BaseModalPage } from '../baseModal.page.js';

export class DeleteModalWindowPage extends BaseModalPage {
  async submitDelete() {
    await this.clickSubmit();
  }
  async closeByCancel() {
    await this.clickCancel();
  }

  async closeByCross() {
    await this.clickCross();
  }
}
