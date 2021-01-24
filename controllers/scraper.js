const puppeteer = require('puppeteer');

async function scrapeItem(url, cb) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox"],
    'ignoreHTTPSErrors': true
});
  const page = await browser.newPage();

  await page.goto(url);
  console.log(`Navigating to ${url}...`);
  let itemPromise = (link) => new Promise(async(resolve, reject) => {
        let dataObj = {};
        await page.waitForSelector('#productTitle');
        dataObj['url'] = link;
        dataObj['title'] = await page.$eval('#productTitle', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""));
        dataObj['initialPrice'] = await page.$eval('#priceblock_ourprice', text => Number(text.textContent.replace(/[^0-9\.]+/g,"")));
        dataObj['description'] = await page.$eval('#productDescription', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""));
        // dataObj['imageUrl'] = await newPage.$eval('#ivLargeImage img', img => img.src);
        resolve(dataObj);
        await page.close();
    });

    try{
        const item = await itemPromise(url);
        cb(item);
    }
    catch (err) {
        console.log('unable to get', err);
    }
    await browser.close();
}

module.exports = scrapeItem;