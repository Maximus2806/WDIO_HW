import { ICreds } from '../../../data/types/user.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class LoginForm extends SalesPortalPage {
  uniqueElement = "//*[text()='Sign in with']";
  private readonly 'User name input' = '#emailinput';
  private readonly 'Password input' = '#passwordinput';
  private readonly 'Login button' = "button[type = 'submit']";

  async fillInputs(credentials: Partial<ICreds>) {
    credentials.username && (await $(this['User name input']).setValue(credentials.username));
    credentials.password && (await $(this['Password input']).setValue(credentials.password));
  }

  async submitForm() {
    await this.click(this['Login button'])
  }
}
