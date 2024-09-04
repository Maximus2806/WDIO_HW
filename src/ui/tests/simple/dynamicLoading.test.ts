// Task 1.

// Разработать тест со следующими шагами:

//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Loading
//   - Дождаться появления каждой ссылки на странице (их 2)
//   - кликнуть по ссылке Example 1: Element on page that is hidden
//   - дождаться появления кнопки start
//   - кликнуть по кнопке start
//   - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)

//  Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text)
//  у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
//   - Использовать browser.waitUntil с комбинацией проверок (элемент виден и тест верный)
//   - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента

const siteUrl = 'https://the-internet.herokuapp.com/';

describe('Dynamic loading', () => {
  const expectedPageTitle = 'Welcome to the-internet';
  const dynamicLoadingItem = '#content >ul>li:nth-child(14)>a';
  const expectedTargetPageTitle = 'Dynamically Loaded Page Elements';
  before(async () => {
    await browser.maximizeWindow();
  });
  beforeEach(async () => {
    await browser.url(siteUrl);
    const pageTitle = await $('#content .heading');
    const actualPageTitle = await pageTitle.getText();
    expect(actualPageTitle).toBe(expectedPageTitle);
  });

  it('Example1 task', async () => {
    await $(dynamicLoadingItem).click();
    const targetPage = await $('#content .example h3');
    expect(await waitForElementWithText(targetPage, expectedTargetPageTitle, 10000));
    const example1Link = await $('//*[@id="content"]/div/a[1]');
    const example2Link = await $('//*[@id="content"]/div/a[2]');
    await example1Link.waitForDisplayed({ timeoutMsg: 'Wrong selector' });
    await example2Link.waitForDisplayed({ timeoutMsg: 'Wrong selector' });
    await example1Link.click();
    const startButton = await $('#start>button');
    await startButton.waitForDisplayed({ timeoutMsg: 'Wrong selector' });
    await startButton.click();
    await browser.pause(5000);
  });
});

async function waitForElementWithText(selector: WebdriverIO.Element, text: string, timeout: number): Promise<boolean> {
  return await browser.waitUntil(
    async () => {
      const actualText = await selector.getText();
      const isVisible = await selector.isDisplayed();
      return actualText === text && isVisible;
    },
    {
      timeout: timeout,
      interval: 1000,
      timeoutMsg: `Text "${await selector.getText()}" in selector "${selector.selector}" does not match expected text "${text}" or it is not visible`
    }
  );
}
