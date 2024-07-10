import playwright from 'playwright';
import { chill } from './helperFunctions';
import {
  NAVER_WEBSITE,
  PLUG_AND_PLAY_KOREA,
  NAVER_NEWS_STRING,
  DIGITS_ARE_PRESENT
} from './consts';

export const scrapeNaver = async(queryTerm = PLUG_AND_PLAY_KOREA): Promise<string[]> => {
  const browser = await playwright.chromium.launch({ headless: true });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto(NAVER_WEBSITE);

  const queryLocator = page.locator("#query")

  await queryLocator.fill(queryTerm);

  await page.locator('button.btn_search').click();

  await page.waitForLoadState('domcontentloaded');

  const newsTab = page.getByRole('tab', { name: '뉴스', exact: true });

  await newsTab.click();
  await page.waitForLoadState('domcontentloaded');

  const optionButton = page.getByRole('button', { name: '옵션' });
  await optionButton.click();

  const customDateTab = page.getByRole('tab', { name: '직접입력' });
  await customDateTab.click();
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('link', { name: '2022', exact: true }).click();

  const selectDateButton = page.locator('li').filter({ hasText: '기간 전체 1시간옵션펼치기접기 1일 1주 1개월 3' }).getByRole('button')
  await selectDateButton.click();
  await page.waitForLoadState('domcontentloaded');

  let previousNumberOfArticles = 0;
  const articleListSelector = 'ul.list_news._infinite_list>li';
  const footer = page.locator('#footer');
  const linksForCSV: string[] = [];

  async function getArticleList() {
    return await page.locator(articleListSelector).all();
  }

  while(true) {
  const articleList = await getArticleList();

    if ( previousNumberOfArticles === articleList.length ) {
      for (let article of articleList) {
        const links = await article.getByRole('link').all();
        for (let link of links) {
          const href = await link.getAttribute('href');
          if ( href === null ) continue;
          if ( href.includes(NAVER_NEWS_STRING) ) continue;
          if ( href.endsWith('.com') ) continue;
          if ( href.endsWith('.com/') ) continue;
          if ( href.endsWith('.kr') ) continue;
          if ( href.endsWith('.kr/') ) continue;

          const urlMatch = href.match(DIGITS_ARE_PRESENT);
          if ( urlMatch === null ) continue;
          if ( !linksForCSV.includes(urlMatch[0]) ) {
            linksForCSV.push(urlMatch[0]);
          }
        }
      }

      break;
    }

    await footer.scrollIntoViewIfNeeded();

    previousNumberOfArticles = articleList.length;

    await chill(1_000);
  }

  await browser.close();
  return linksForCSV;
};

