const url = 'https://anatoly-karpovich.github.io/demo-login-form/';

describe('Login', () => {
  const registerButtonSelector = '#registerOnLogin';
  const backButtonSelector = '#backOnRegister';
  const expectedFormTitle = 'Login';
  const credsForRegistration = {
    username: 'maximus',
    password: 'Abcd1234',
    message: 'Successfully registered! Please, click Back to return on login page'
  };

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    const formTitle = await $('div.loginForm h2');
    const actualFormTitle = await formTitle.getText();
    expect(actualFormTitle).toBe(expectedFormTitle);
    const registrationLink = await $(registerButtonSelector);
    await registrationLink.click();
    const usernameField = await $('#userNameOnRegister');
    const passwordField = await $('#passwordOnRegister');
    const registerButton = await $('#register');
    await usernameField.setValue(credsForRegistration.username);
    await passwordField.setValue(credsForRegistration.password);
    await registerButton.click();
    const registerSuccessNotification = await $('div.registerForm h4');
    await expect(registerSuccessNotification).toHaveText(`${credsForRegistration.message}`);
    const backButton = $(backButtonSelector);
    await backButton.click();
  });

  context('Login with valid credentials', async () => {
    it('Login with credatials used while registering', async () => {
      const usernameField = await $('#userName');
      const passwordField = await $('#password');
      const submitButton = await $('#submit');
      await usernameField.setValue(credsForRegistration.username);
      await passwordField.setValue(credsForRegistration.password);
      await submitButton.click();
      const loginSuccessNotification = await $('#successMessage');
      await expect(loginSuccessNotification).toHaveText(`Hello, ${credsForRegistration.username}!`);
    });
  });

  context('Login with invalid credentials', async () => {
    const invalidCredentials = [
      {
        username: 'maximus1',
        password: 'Abcd1234',
        testName: 'Should not login with non existent name and valid password',
        message: 'Invalid credentials'
      },
      {
        username: 'maximus',
        password: 'Abcd1234#!',
        testName: 'Should not login with valid name and incorrect password',
        message: 'Invalid credentials'
      },
      {
        username: '',
        password: 'Abcd1234',
        testName: 'Should not login with empty name and valid password',
        message: 'Username is required'
      },
      {
        username: 'maximus',
        password: '',
        testName: 'Should not login with valid name and empty password',
        message: 'Password is required'
      },
      {
        username: '',
        password: '',
        testName: 'Should not login with empty inputs',
        message: 'Credentials are required'
      },
      {
        username: 'Maximus',
        password: 'Abcd1234',
        testName: 'Should not login with incorrect letter case in username',
        message: 'Invalid credentials'
      }
    ];
    for (const cred of invalidCredentials) {
      it(`${cred.testName}`, async () => {
        const usernameField = await $('#userName');
        const passwordField = await $('#password');
        const submitButton = await $('#submit');
        await usernameField.setValue(cred.username);
        await passwordField.setValue(cred.password);
        await submitButton.click();
        const warningNotification = await $('div.loginForm h4');
        await expect(warningNotification).toHaveText(`${cred.message}`);
        //   await browser.execute("arguments[0].removeAttribute('maxLength');", usernameField);
        //   await browser.execute("arguments[0].removeAttribute('maxLength');", passwordField);
        //   await usernameField.setValue(cred.username);
        //   await passwordField.setValue(cred.password);
        //   await registerButton.click();
        //   const registerSuccessNotification = await $('div.registerForm h4');
        //   await expect(registerSuccessNotification).toHaveText(`${cred.message}`);
      });
    }
  });
  afterEach(() => {
    browser.execute('window.localStorage.clear()');
  });
});
