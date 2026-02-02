export async function scrapeList(
  browser: any,
  baseUrl: string,
  type: string,
  city: string
) {
  const page = await browser.newPage();
  const collected: any[] = [];
  const seen = new Set<number>();

  let skip = 0;
  const PAGE_SIZE = 12;

  while (true) {
    const pagedUrl = `${baseUrl}&skip=${skip}`;
    console.log(type + ":", pagedUrl);

    await page.goto(pagedUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    const items = await page.$$eval(
      ".content.grid .item",
      (nodes: any[], ctx: any) =>
        nodes.map(node => ({
          name: node.querySelector(".title")?.textContent?.trim() ?? null,
          recid: Number(node.getAttribute("data-recid")),
          url: (() => {
            const href = node.querySelector(".title")?.getAttribute("href");
            if (!href) return null;
            if (href.startsWith("http")) return href;
            if (href.startsWith("/")) return `https://www.discovernewport.org${href}`;
            return null;
          })(),
          image:
            node.querySelector("img.thumb")?.getAttribute("src") ||
            node.querySelector("img.thumb")?.getAttribute("data-lazy-src") ||
            null,
          type: ctx.type,
          city: ctx.city,
        })),
      { type, city }
    );

    let added = 0;

    for (const item of items) {
      if (!item.recid || seen.has(item.recid)) continue;
      seen.add(item.recid);
      collected.push(item);
      added++;
    }

    // stop 
    if (added === 0) {
      console.log("No new items found — stopping pagination");
      break;
    }

    // secondary safety
    if (items.length < PAGE_SIZE) break;

    skip += PAGE_SIZE;
  }

  await page.close();
  return collected;
}