import { PAGES } from '../../../data/types/pageTitle.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class HomePage extends SalesPortalPage {
  readonly uniqueElement = '#navigation-section > div:nth-child(2) > h2';
  private readonly 'Home from sidebar' = '#sidebar > ul > li:nth-child(1) > a';
  private readonly 'Orders from sidebar' = '#sidebar > ul > li:nth-child(2) > a';
  private readonly 'Products from sidebar' = '#sidebar > ul > li:nth-child(3) > a';
  private readonly 'Customers from sidebar' = '#sidebar > ul > li:nth-child(4) > a';
  private readonly 'Profile menu' = '#dropdownUser1';
  private readonly 'Sign out button' = '#signOut';

  async openPage(pageTitle: PAGES) {    
    await this.click(this[`${pageTitle} from sidebar`]);
    await this.waitForSpinnerToHide();
  }

  async signOut() {
    this.click(this['Profile menu']);
    this.click(this['Sign out button']);
  }
}
