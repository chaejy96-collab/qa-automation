import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SeriesPage } from '../pages/series.page';

test.describe('Tapas.io 메인 유저 흐름 E2E 테스트', () => {
  let homePage: HomePage;
  let seriesPage: SeriesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    seriesPage = new SeriesPage(page);
    await homePage.goto('https://tapas.io');
  });

  test('1. Tapas 메인 접속 및 페이지 정상 로딩 확인', async ({ page }) => {
    await expect(page).toHaveURL(/tapas\.io/);
  });

  test('2. 검색 기능 동작 및 검색 결과 이동 검증', async ({ page }) => {
    await homePage.search('Solo Leveling');
    await expect(page).toHaveURL(/.*search.*/);
  });

  test('3. 작품 클릭 시 상세 페이지 이동 검증', async ({ page }) => {
    await homePage.clickFirstSeries();
    await expect(page).toHaveURL(/.*\/series\/.*/);
  });
});
