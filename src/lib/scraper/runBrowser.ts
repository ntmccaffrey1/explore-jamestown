import { chromium } from "playwright"

export async function runBrowser(
  fn: (browser: any) => Promise<void>
) {
  const browser = await chromium.launch({ headless: true })

  try {
    await fn(browser)
  } finally {
    await browser.close()
  }
}