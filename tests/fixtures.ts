import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ReaderPage } from '../pages/reader.page';
import { SeriesPage } from '../pages/series.page';

type PageObjects = {
  homePage: HomePage;
  seriesPage: SeriesPage;
  readerPage: ReaderPage;
};

// 모든 시나리오의 시작 상태와 페이지 객체 생성을 한곳에서 관리한다.
export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto('/');
    await homePage.dismissCookieBanner();
    await use(homePage);
  },
  seriesPage: async ({ page }, use) => {
    await use(new SeriesPage(page));
  },
  readerPage: async ({ page }, use) => {
    await use(new ReaderPage(page));
  },
});

export { expect } from '@playwright/test';
