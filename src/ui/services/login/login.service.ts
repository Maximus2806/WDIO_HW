import { ICreds } from '../../../data/types/user.types.js';
import { LoginForm } from '../../pages/signIn/login.page.js';
import { ADMIN_PASSWORD, ADMIN_USER_NAME, BASE_URL } from '../../../config/environments.js';
import { logStep } from '../../../utils/report/decorator.js';

export class LoginService {
  private loginForm: LoginForm;
  constructor() {
    this.loginForm = new LoginForm();
  }

  @logStep('Login')
  async login(credentials: ICreds) {
    await this.loginForm.fillInputs(credentials);
    await this.loginForm.submitForm();
    await this.loginForm.waitForSpinnerToHide();
  }

  @logStep('Login as admin')
  async loginAsAdmin() {
    await this.loginForm.fillInputs({ username: ADMIN_USER_NAME, password: ADMIN_PASSWORD });
    await this.loginForm.submitForm();
  }

  @logStep('Open sales portal')
  async openSalesPortal() {
    await this.loginForm.openPage(BASE_URL);
  }

  @logStep('Sign out')
  async signOut() {
    await this.loginForm.deleteCookies(['Authorization']);
  }
}
