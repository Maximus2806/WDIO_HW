import { PAGES } from '../../../data/types/pageTitle.types.js';
import { HomePage } from '../../pages/home/home.page.js';

export class HomeService {
  private homePage: HomePage;
  constructor() {
    this.homePage = new HomePage();
  }

  async openProductsPage() {
    // console.log(this.homePage);
    this.homePage.openPage(PAGES.PRODUCTS);
  }
}
