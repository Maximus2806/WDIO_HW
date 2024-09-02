import { logAction } from "../../utils/report/decorator.js";

const TIMEOUT_5_SECS = 5000;

export abstract class BasePage {
  private isWdioElement(locator: string | WebdriverIO.Element): locator is WebdriverIO.Element {
    return (locator as WebdriverIO.Element).elementId !== undefined;
  }

  private async findElement(locator: string | WebdriverIO.Element): Promise<WebdriverIO.Element> {
    if (this.isWdioElement(locator)) {
      return locator;
    } else {
      return $(locator);
    }
  }

  protected async waitForElement(
    locator: string | WebdriverIO.Element,
    timeout = TIMEOUT_5_SECS,
    reverse = false
  ): Promise<WebdriverIO.Element> {
    const element = await this.findElement(locator);
    await element.waitForDisplayed({ timeout, reverse });
    return element;
  }

  @logAction('Click on element with selector {selector}')
  protected async click(locator: string | WebdriverIO.Element, timeout = TIMEOUT_5_SECS): Promise<void> {
    const element = await this.waitForElement(locator, timeout);
    await element.click();
  }

  @logAction('Set {text} into element with selector {selector}')
  async setValue(
    locator: string | WebdriverIO.Element,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ): Promise<void> {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
  }

  async getText(locator: string | WebdriverIO.Element, timeout = TIMEOUT_5_SECS): Promise<string> {
    const element = await this.waitForElement(locator, timeout);
    return await element.getText();
  }

  @logAction('Select dropdown value from {selector}')
  async selectDropdownValue(
    dropdownLocator: string | WebdriverIO.Element,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ): Promise<void> {
    const element = await this.waitForElement(dropdownLocator, timeout);
    await element.selectByVisibleText(value);
  }

  @logAction('Open URL {selector}')
  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieName: string[]) {
    await browser.deleteCookies(cookieName);
  }
}
