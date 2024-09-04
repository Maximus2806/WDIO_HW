import { TOAST_MESSAGE } from '../../data/types/toastMessage.types.js';
import { SalesPortalPage } from '../pages/salesPortal.page.js';

export class SalesPortalService {
  constructor(private salesPortalpage: SalesPortalPage) {}

  async verifyNotification(expectedMessage: TOAST_MESSAGE) {
    const actualMessage = await this.salesPortalpage.getToastMessage();
    expect(actualMessage).toBe(expectedMessage);
    await this.salesPortalpage.closeToastMessage()
  }
}
