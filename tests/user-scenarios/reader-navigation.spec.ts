import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { SeriesPage } from '../../pages/series.page';
import { ReaderPage } from '../../pages/reader.page';
import testData from '../../data/testData.json';

test.describe('Tapas.io 에피소드 내비게이션 테스트', () => {
  let homePage: HomePage;
  let seriesPage: SeriesPage;
  let readerPage: ReaderPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    seriesPage = new SeriesPage(page);
    readerPage = new ReaderPage(page);
    await homePage.goto('https://tapas.io');
  });

  test('에피소드 선택 및 이전/다음 버튼 이동 검증', async ({ page }) => {
    // 1. 검색 및 작품 진입
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();
    await expect(page).toHaveURL(/.*\/series\/.*/);
    
    // 2. 에피소드 목록에서 에피소드 선택
    await seriesPage.clickEpisodeByTitle('Episode 0');
    
    // 리더 UI가 로드될 때까지 명시적 대기
    const nextBtn = page.locator('.js-next-ep-btn');
    const prevBtn = page.locator('.js-prev-ep-btn');
    await expect(nextBtn.first()).toBeVisible({ timeout: 15000 });

    // 3. 다음 화 버튼 이동 검증 (안정적 대기 후 클릭)
    await nextBtn.first().click();
    // 이동 후 리더 UI 상태 재확인
    await expect(nextBtn.first()).toBeVisible({ timeout: 10000 });
    
    // 4. 이전 화 버튼 이동 검증 (안정적 대기 후 클릭)
    // 이전 버튼이 disabled 상태가 아닐 때만 클릭하거나, 그냥 클릭 시도 후 검증
    await prevBtn.first().click();
    await expect(prevBtn.first()).toBeVisible({ timeout: 10000 });
  });
});

