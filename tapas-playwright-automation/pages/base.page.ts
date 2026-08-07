import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Tapas 상단 검색창 요소
    this.searchInput = page.locator('input[type="search"], input[name="q"], .search-input');
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }
}
