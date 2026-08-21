import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { SeriesPage } from '../../pages/series.page';
import { ReaderPage } from '../../pages/reader.page';
import testData from '../../data/testData.json';

test.describe('Tapas.io Functional & Boundary Tests', () => {
  let homePage: HomePage;
  let seriesPage: SeriesPage;
  let readerPage: ReaderPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    seriesPage = new SeriesPage(page);
    readerPage = new ReaderPage(page);
    await homePage.goto('https://tapas.io');
  });

  test('정렬 기능 변경 시 첫 번째 에피소드 제목 변경 검증', async ({ page }) => {
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();

    const initialTitle = await seriesPage.getFirstEpisodeTitle();
    await seriesPage.toggleSortOrder();
    
    // 정렬 변경 후 데이터를 가져올 시간을 위해 잠시 대기 혹은 명시적 로케이터 재탐색이 필요할 수 있음
    await page.waitForTimeout(2000); 
    
    const newTitle = await seriesPage.getFirstEpisodeTitle();
    expect(initialTitle).not.toBe(newTitle);
  });

  test('첫 번째 에피소드 진입 시 이전 화 버튼 비활성화 확인', async ({ page }) => {
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();
    await seriesPage.clickEpisodeByTitle('Episode 0');
    
    const prevBtn = page.locator('.js-prev-ep-btn');
    // 비활성화 상태이거나 클래스에 'disabled'가 포함되는지 확인
    await expect(prevBtn.first()).toHaveClass(/disabled/);
  });
});
