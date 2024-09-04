import { BasePage } from './base.page.js';

export abstract class BaseModalPage extends BasePage {
  protected readonly 'Submit button' = '//div[@class="modal-footer"]//button[1]';
  protected readonly 'Cancel button' = '//div[@class="modal-footer"]//button[2]';
  protected readonly 'Cross button' = '//div[@class="modal-header"]/button';

  async clickCancel() {
    await this.click(this['Cancel button']);
  }

  async clickCross() {
    await this.click(this['Cross button']);
  }

  async clickSubmit() {
    await this.click(this['Submit button']);
  }
}
