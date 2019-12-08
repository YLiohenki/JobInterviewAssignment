import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl + "/dashboard") as Promise<any>;
  }

  getTitleText() {
    return element(by.css("app-root h1")).getText() as Promise<string>;
  }

  getHouseTilesCount() {
    return element
      .all(by.tagName("app-house-tile"))
      .count() as Promise<number>;
  }
}
