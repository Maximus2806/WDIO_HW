import { PAGES } from '../../../data/types/pageTitle.types.js';
import { HomePage } from '../../pages/home/home.page.js';

export class HomeService {  
  constructor(private homePage = new HomePage()) {}

  async openProductsPage() {    
    this.homePage.openPage(PAGES.PRODUCTS);
  }
}
