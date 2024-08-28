import { ICreds } from '../../../data/types/user.types.js';
import { LoginForm } from '../../pages/signIn/login.page.js';

const adminCreds: ICreds = {
  email: `${process.env.ADMIN_USER_NAME}`,
  password: `${process.env.ADMIN_PASSWORD}`
};

export class LoginService {
  private loginForm: LoginForm;
  constructor() {
    this.loginForm = new LoginForm();
  }

  async login(credentials: ICreds) {
    await this.loginForm.fillInputs(credentials);
    await this.loginForm.submitForm();
    await this.loginForm.waitForSpinnerToHide();
  }

  async loginAsAdmin() {
    await this.loginForm.fillInputs(adminCreds);
    await this.loginForm.submitForm();
  }
}
