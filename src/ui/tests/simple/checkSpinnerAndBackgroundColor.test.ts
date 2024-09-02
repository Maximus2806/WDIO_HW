// Task 2.
// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
//  - проверить исчезновение спиннера с помощью waitFor* методов
//  - проверить действительно ли пользователь с логином AQA User вошел в систему
//  - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

//  Рекомендации по использованию:
//  - метод $$ поиска по всем элементам
//  - for .. of  для перебора коллекции элементов
//  - метод click() для клика по элементу в цикле
//  - Проверить background-color можно двумя способами:
//     1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
//     2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute

const site2Url = 'https://anatoly-karpovich.github.io/aqa-course-project/#';

describe('Task2_Check spinner and background color', () => {
  const loginFieldSelector = '#emailinput';
  const passFieldSelector = '#passwordinput';
  const loginButtonSelector = "//div/button[text()='Login']";
  const spinnerSelector = 'div.spinner-border';
  const credentials = {
    login: 'aqacourse@gmail.com',
    password: 'password'
  };
  const userName = 'AQA User';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(site2Url);
    const loginField = await $(loginFieldSelector);
    const passField = await $(passFieldSelector);
    const loginButton = await $(loginButtonSelector);
    await loginField.setValue(credentials.login);
    await passField.setValue(credentials.password);
    await loginButton.click();
    await waitForElementDisappears(spinnerSelector, 5000);
  });

  afterEach(async () => {
    await browser.deleteCookie('Authorization');
    await browser.refresh();
  });
  it('Ensure user is logged in', async () => {
    const userNameSelector = "//strong[text()='AQA User']";
    expect(await $(userNameSelector)).toHaveText(userName);
  });
  it('Ensure menu item background color is not red after it had been clicked', async () => {
    const menuListSelector = '#sidebar ul[class="nav nav-pills flex-column"] a';
    const menuItemsList = await $$(menuListSelector);
    for (const item of menuItemsList) {
      await item.click();
      await browser.pause(1000);
      const itemClass = await item.getAttribute('class');
      expect(itemClass).not.toBe('nav-link text-white bg-danger');
    }
  });
});

async function waitForElementDisappears(selector: string, timeout: number) {
  const element = await $(selector);
  await element.waitForDisplayed({
    timeout: timeout,
    interval: 500,
    timeoutMsg: 'Element is displayed',
    reverse: true
  });
}
