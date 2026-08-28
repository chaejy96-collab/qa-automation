import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class SeriesPage extends BasePage {
  readonly sortButton: Locator;
  readonly seriesTitle: Locator;
  readonly episodeListContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.seriesTitle = page.locator('h1, .title');
    this.episodeListContainer = page.locator('.episode-list, .ep-list');
    this.sortButton = page.locator('.js-sort');
  }

  async clickEpisodeByTitle(title: string) {
    const episodeLink = this.page.locator(`.info__title:has-text("${title}")`).first();
    await episodeLink.click();
  }

  async toggleSortOrder() {
    await this.sortButton.click();
  }

  async getFirstEpisodeTitle(): Promise<string> {
    return await this.episodeListContainer.locator('.info__title').first().innerText();
  }

  async waitForFirstEpisodeTitleToChange(previousTitle: string) {
    await this.page.waitForFunction(
      ({ selector, previous }) => document.querySelector(selector)?.textContent?.trim() !== previous,
      { selector: '.episode-list .info__title, .ep-list .info__title', previous: previousTitle },
    );
  }
}
