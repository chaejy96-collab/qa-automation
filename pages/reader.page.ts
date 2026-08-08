import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ReaderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // [유지보수 전략] UI 디자인 클래스가 아닌, JS 기능 후크 클래스 사용
  private getNextButton(): Locator {
    return this.page.locator('.js-next-ep-btn');
  }

  private getPrevButton(): Locator {
    return this.page.locator('.js-prev-ep-btn');
  }

  async clickNextEpisode() {
    const btn = this.getNextButton();
    // 요소가 DOM에 존재하는지 우선 확인 (안전성 강화)
    await btn.first().waitFor({ state: 'attached', timeout: 5000 });
    await btn.first().scrollIntoViewIfNeeded(); 
    await btn.first().waitFor({ state: 'visible', timeout: 5000 });
    await btn.first().click();
  }

  async clickPreviousEpisode() {
    const btn = this.getPrevButton();
    await btn.first().waitFor({ state: 'attached', timeout: 5000 });
    await btn.first().scrollIntoViewIfNeeded();
    await btn.first().waitFor({ state: 'visible', timeout: 5000 });
    await btn.first().click();
  }
}
