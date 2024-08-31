import { BasePage } from '../base.page.js';

export class ModalWindowPage extends BasePage {
  private readonly 'Submit button' = '//div[@class="modal-footer"]//button[1]';
  private readonly 'Cancel button' = '//div[@class="modal-footer"]//button[2]';
  private readonly 'Cross button' = '//div[@class="modal-header"]/button';
  private readonly 'Name' = '.modal-body section > div:nth-child(1) > div';
  private readonly 'Amount' = '.modal-body section > div:nth-child(2) > div';
  private readonly 'Price' = '.modal-body section > div:nth-child(3) > div';
  private readonly 'Manufacturer' = '.modal-body section > div:nth-child(4) > div';
  private readonly 'Created On' = '.modal-body section > div:nth-child(5) > div';
  private readonly 'Notes' = '.modal-body section > div:nth-child(6) > div';

  async clickEditButton() {
    await this.click(this['Submit button']);
  }

  async closeByCancel() {
    await this.click(this['Cancel button']);
  }

  async closeByCross() {
    await this.click(this['Cross button']);
  }

  async submit() {
    await this.click(this['Submit button']);
  }

  async getProductData() {
    const [name, amount, price, manufacturer, createdOn, notes] = await Promise.all([
      this.getText(this['Name']),
      this.getText(this['Amount']),
      this.getText(this['Price']),
      this.getText(this['Manufacturer']),
      this.getText(this['Created On']),
      this.getText(this['Notes'])
    ]);
    const textDataFromModal = { name, amount, price, manufacturer, createdOn, notes };
    const dataFromModal = {
      ...textDataFromModal,
      price: +textDataFromModal.price
    };
    return dataFromModal;
  }
}
