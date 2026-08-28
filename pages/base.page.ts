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
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async search(keyword: string) {
    const input = this.searchInput.first();
    await input.fill(keyword);
    await input.press('Enter');
  }

  async dismissCookieBanner() {
    const acceptButton = this.page.getByRole('button', { name: 'Accept' });
    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    }
  }
}
