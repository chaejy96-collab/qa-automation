import { expect, test } from '../fixtures';
import testData from '../../data/testData.json';

test.describe('Tapas.io 기능 및 경계 조건 테스트', () => {
  test('정렬 변경은 목록 첫 에피소드를 갱신한다', async ({ homePage, seriesPage }) => {
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();

    const initialTitle = await seriesPage.getFirstEpisodeTitle();
    await seriesPage.toggleSortOrder();
    await seriesPage.waitForFirstEpisodeTitleToChange(initialTitle);
    await expect.poll(() => seriesPage.getFirstEpisodeTitle()).not.toBe(initialTitle);
  });

  test('첫 에피소드에서는 이전 화 버튼이 비활성화된다', async ({ homePage, seriesPage, readerPage }) => {
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();
    await seriesPage.clickEpisodeByTitle(testData.firstEpisodeTitle);
    await readerPage.waitForControls();
    
    await expect(readerPage.isPreviousEpisodeDisabled()).resolves.toBe(true);
  });
});
