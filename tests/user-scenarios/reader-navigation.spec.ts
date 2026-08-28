import { expect, test } from '../fixtures';
import testData from '../../data/testData.json';

test.describe('Tapas.io 리더 내비게이션 상태 테스트', () => {
  test('선택한 에피소드의 리더 제목과 다음 화 이동 가능 상태를 확인한다', async ({ page, homePage, seriesPage, readerPage }) => {
    await homePage.search(testData.searchKeyword);
    await homePage.clickFirstSeries();
    await expect(page).toHaveURL(/\/series\//);
    
    await seriesPage.clickEpisodeByTitle(testData.firstEpisodeTitle);
    await readerPage.waitForControls();

    await expect(readerPage.episodeTitle).toHaveText(testData.firstEpisodeTitle);
    await expect(readerPage.nextButton.first()).not.toHaveClass(/disabled/);
  });
});
