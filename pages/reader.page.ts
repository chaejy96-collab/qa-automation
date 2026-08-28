import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ReaderPage extends BasePage {
  get episodeTitle(): Locator {
    // 목록에도 같은 제목이 있으므로, 화면에 실제로 표시된 제목을 선택한다.
    return this.page.locator('p:visible').filter({ hasText: /^Episode \d+$/ }).first();
  }

  constructor(page: Page) {
    super(page);
  }

  // [유지보수 전략] UI 디자인 클래스가 아닌, JS 기능 후크 클래스 사용
  get nextButton(): Locator {
    return this.page.locator('.js-next-ep-btn:visible');
  }

  get previousButton(): Locator {
    return this.page.locator('.js-prev-ep-btn:visible');
  }

  async clickNextEpisode() {
    const btn = this.nextButton;
    // 요소가 DOM에 존재하는지 우선 확인 (안전성 강화)
    await btn.first().waitFor({ state: 'attached', timeout: 5000 });
    await btn.first().scrollIntoViewIfNeeded(); 
    await btn.first().waitFor({ state: 'visible', timeout: 5000 });
    await btn.first().click();
  }

  async clickPreviousEpisode() {
    const btn = this.previousButton;
    await btn.first().waitFor({ state: 'attached', timeout: 5000 });
    await btn.first().scrollIntoViewIfNeeded();
    await btn.first().waitFor({ state: 'visible', timeout: 5000 });
    await btn.first().click();
  }

  async waitForControls() {
    await this.nextButton.first().waitFor({ state: 'visible', timeout: 15_000 });
    await this.previousButton.first().waitFor({ state: 'visible', timeout: 15_000 });
    await this.episodeTitle.waitFor({ state: 'visible', timeout: 15_000 });
  }

  async getEpisodeTitle(): Promise<string> {
    return (await this.episodeTitle.innerText()).trim();
  }

  async isPreviousEpisodeDisabled(): Promise<boolean> {
    const button = this.previousButton.first();
    const [disabled, ariaDisabled, className] = await Promise.all([
      button.isDisabled(),
      button.getAttribute('aria-disabled'),
      button.getAttribute('class'),
    ]);

    return disabled || ariaDisabled === 'true' || /(^|\s)disabled(\s|$)/.test(className ?? '');
  }
}
