import 'expect-puppeteer';

describe('localhost', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:6112')
  })

  it('should display "hello" text on page', async (done) => {
    await expect(page).toMatch('Hello Next.js')
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    done();
  })
});
