import { expect, test } from '../fixtures';
import testData from '../../data/testData.json';

test.describe('Tapas.io 메인 유저 흐름 E2E 테스트', () => {
  test('홈 페이지를 로드한다', async ({ page, homePage }) => {
    await expect(page).toHaveURL(/tapas\.io/);
    await expect(homePage.searchInput.first()).toBeVisible();
  });

  test('검색 결과에서 작품 상세 페이지로 이동한다', async ({ page, homePage }) => {
    await homePage.search(testData.searchKeyword);
    await expect(page).toHaveURL(/search/);

    await homePage.clickFirstSeries();
    await expect(page).toHaveURL(/\/series\//);
  });
});
