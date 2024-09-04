import { BaseModalPage } from '../baseModal.page.js';

export class ModalWindowPage extends BaseModalPage {
  private readonly 'Row value by row name' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[text()="${row}:"]]/div`;

  async clickEditButton() {
    await this.clickSubmit();
  }

  async closeByCancel() {
    await this.clickCancel();
  }

  async closeByCross() {
    await this.clickCross();
  }

  async submit() {
    await this.clickSubmit();
  }

  async getProductData() {
    const [name, amount, price, manufacturer, createdOn, notes] = await Promise.all([
      this.getText(this['Row value by row name']('Name')),
      this.getText(this['Row value by row name']('Amount')),
      this.getText(this['Row value by row name']('Price')),
      this.getText(this['Row value by row name']('Manufacturer')),
      this.getText(this['Row value by row name']('Created On')),
      this.getText(this['Row value by row name']('Notes'))
    ]);
    return { name, amount, price: +price, manufacturer, createdOn, notes };
  }
}
