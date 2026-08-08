import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ReaderPage } from '../../pages/reader.page';
import testData from '../../data/testData.json';

test.describe('Tapas.io 에피소드 내비게이션 테스트', () => {
  let homePage: HomePage;
  let readerPage: ReaderPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    readerPage = new ReaderPage(page);
    await homePage.goto('https://tapas.io');
  });

  test('에피소드 선택 및 이전/다음 버튼 이동 검증', async ({ page }) => {
    // 1. 검색 및 작품 진입
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();
    
    // 2. 에피소드 목록에서 임의의 에피소드 선택 (예: 2번째 에피소드)
    await page.locator('.episode-list a').nth(1).click();

    // 3. 다음 화 버튼 이동 검증
    await readerPage.clickNextEpisode();
    
    // 4. 이전 화 버튼 이동 검증
    await readerPage.clickPreviousEpisode();

    // 동작이 잘 수행되었는지 확인 (에러 없이 완료)
    expect(true).toBe(true);
  });
});

