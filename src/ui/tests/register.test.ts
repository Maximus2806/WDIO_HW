// - Установить WebdriverIO командой  npm init wdio@latest .
// - Создать файл для теста с названием register.spec.ts
// - Добавить во wdio.conf.ts путь к файлу с тестом в массив specs
// Разработайте тест со следующими шагами:
// 1. Открыть страницу https://anatoly-karpovich.github.io/demo-login-form/ используя browser.url()
// 2. Кликнуть по кнопке Register методом . click()
// 3. Ввести валидные username/password (требования ниже) методом setValue()
// 4. Кликнуть Register
// 5. Завалидировать, верную нотификацию о регистрации методом .toHaveText()
export {};
const url = 'https://anatoly-karpovich.github.io/demo-login-form/';

describe('Registration', () => {
  const registerButtonSelector = '#registerOnLogin';
  const expectedFormTitle = 'Login';
  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    const formTitle = await $('div.loginForm h2');
    const actualFormTitle = await formTitle.getText();
    expect(actualFormTitle).toBe(expectedFormTitle);
  });

  context('Positive scenarios', () => {
    const validCredentials = [
      {
        username: 'maximus',
        password: 'Abcd1234#!',
        testName: 'Should register with valid credential',
        message: 'Successfully registered! Please, click Back to return on login page'
      },
      {
        username: 'max',
        password: 'Abcdefgh',
        testName: 'Should register with username and password of minimum length',
        message: 'Successfully registered! Please, click Back to return on login page'
      },
      {
        username: 'LongNameOf40CharactersNameOf40Characters',
        password: 'LongPasswordOf20Char',
        testName: 'Should register with username and password of maximum lengt',
        message: 'Successfully registered! Please, click Back to return on login page'
      }
    ];

    for (const cred of validCredentials) {
      it(`${cred.testName}`, async () => {
        const registrationLink = await $(registerButtonSelector);
        await registrationLink.click();
        const usernameField = await $('#userNameOnRegister');
        const passwordField = await $('#passwordOnRegister');
        const registerButton = await $('#register');
        await usernameField.setValue(cred.username);
        await passwordField.setValue(cred.password);
        await registerButton.click();
        const registerSuccessNotification = await $('div.registerForm h4');
        await expect(registerSuccessNotification).toHaveText(`${cred.message}`);
        // await browser.pause(1000);
      });
    }
  });

  afterEach(async () => {
    await browser.execute('window.localStorage.clear()');
  });

  context('Negative scenarios', () => {
    const negativeTestNameTemplate = 'Should not accept ';
    const usernameRequirement = 'Username should contain ';
    const lengthExceedTemplate = "can't exceed ";
    const spacePresenceMessage = 'Prefix and postfix spaces are not allowed is username';
    const passwordRequirement = 'Password should contain ';
    const passwordAbscenceMessage = 'Password is required';
    const invalidCredentials = [
      {
        username: ' maximus',
        password: 'Abcd1234#!',
        testName: `${negativeTestNameTemplate}username with leading spaces`,
        message: `${spacePresenceMessage}`
      },
      {
        username: 'maximus ',
        password: 'Abcd1234#!',
        testName: `${negativeTestNameTemplate}username with trailing spaces`,
        message: `${spacePresenceMessage}`
      },
      {
        username: '       ',
        password: 'Abcd1234#!',
        testName: `${negativeTestNameTemplate}username with only spaces`,
        message: `${spacePresenceMessage}`
      },
      {
        username: 'ma',
        password: 'Abcd1234#!',
        testName: `${negativeTestNameTemplate}username less than 3 characters length`,
        message: `${usernameRequirement}at least 3 characters`
      },
      {
        username: 'LongNameOf41CharactersNameOf41Characters1',
        password: 'Abcd1234#!',
        testName: `${negativeTestNameTemplate}username more than 40 characters length`,
        message: `Username ${lengthExceedTemplate}40 characters`
      },
      {
        username: 'maximus',
        password: 'abcdefgh',
        testName: `${negativeTestNameTemplate}password without uppercase letters`,
        message: `${passwordRequirement}at least one character in upper case`
      },
      {
        username: 'maximus2',
        password: 'ABCDEFGH',
        testName: `${negativeTestNameTemplate}password without lowercase letters`,
        message: `${passwordRequirement}at least one character in lower case`
      },
      {
        username: 'maximus',
        password: '        ',
        testName: `${negativeTestNameTemplate}password with only spaces`,
        message: `${passwordAbscenceMessage}`
      },
      {
        username: 'maximus',
        password: '',
        testName: `${negativeTestNameTemplate}empty password field`,
        message: `${passwordAbscenceMessage}`
      },
      {
        username: '',
        password: 'Abcd1234#!',
        testName: `${negativeTestNameTemplate}empty username field`,
        message: 'Username is required'
      },
      {
        username: '',
        password: '',
        testName: `${negativeTestNameTemplate}empty both fields`,
        message: 'Please, provide valid data'
      },
      {
        username: 'maximus',
        password: 'Abcd123',
        testName: `${negativeTestNameTemplate}password shorter than 8 characters`,
        message: `${passwordRequirement}at least 8 characters`
      },
      {
        username: 'maximus',
        password: 'Abcd123Abcd123Abcd123',
        testName: `${negativeTestNameTemplate}password longer than 20 characters`,
        message: `Password ${lengthExceedTemplate}20 characters`
      }
    ];

    for (const cred of invalidCredentials) {
      it(`${cred.testName}`, async () => {
        const registrationLink = await $(registerButtonSelector);
        await registrationLink.click();
        const usernameField = await $('#userNameOnRegister');
        const passwordField = await $('#passwordOnRegister');
        const registerButton = await $('#register');
        await browser.execute("arguments[0].removeAttribute('maxLength');", usernameField);
        await browser.execute("arguments[0].removeAttribute('maxLength');", passwordField);
        await usernameField.setValue(cred.username);
        await passwordField.setValue(cred.password);
        await registerButton.click();
        const warningNotification = await $('div.registerForm h4');
        await expect(warningNotification).toHaveText(`${cred.message}`);
      });
    }

    it('Register with existing username', async () => {
      const registrationLink = await $(registerButtonSelector);
      await registrationLink.click();
      const usernameField = await $('#userNameOnRegister');
      const passwordField = await $('#passwordOnRegister');
      const registerButton = await $('#register');
      await usernameField.setValue('maximus');
      await passwordField.setValue('Abcd1234');
      await registerButton.click();
      await registerButton.click();
      const registerSuccessNotification = await $('div.registerForm h4');
      await expect(registerSuccessNotification).toHaveText('Username is in use');
    });

    afterEach(() => {
      browser.execute('window.localStorage.clear()');
    });
  });
});
