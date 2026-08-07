import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class SeriesPage extends BasePage {
  readonly seriesTitle: Locator;
  readonly episodeList: Locator;

  constructor(page: Page) {
    super(page);
    this.seriesTitle = page.locator('h1, .title');
    this.episodeList = page.locator('.episode-list, .ep-list, a[href*="/episode/"]');
  }
}
