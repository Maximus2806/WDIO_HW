import { PAGES } from '../../../data/types/pageTitle.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { HomePage } from '../../pages/home/home.page.js';

export class HomeService {  
  constructor(private homePage = new HomePage()) {}

  @logStep('Open products page')
  async openProductsPage() {    
    this.homePage.openPage(PAGES.PRODUCTS);
  }
}
