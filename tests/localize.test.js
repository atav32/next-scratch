import 'expect-puppeteer';

describe('localhost', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:6112/localize')
  })

  it('should display "hello" text on page', async (done) => {
    await expect(page).toMatch('First')
    await expect(page).toMatch('Second')
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    done();
  })
});
