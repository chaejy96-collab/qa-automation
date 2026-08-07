import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly mainBanner: Locator;
  readonly seriesThumbnails: Locator;

  constructor(page: Page) {
    super(page);
    this.mainBanner = page.locator('.hero, .banner-container, header');
    this.seriesThumbnails = page.locator('a[href*="/series/"]');
  }

  async clickFirstSeries() {
    await this.seriesThumbnails.first().click();
  }
}
