const puppeteer = require('puppeteer');

async function scrapeItem(url, cb) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox"],
    'ignoreHTTPSErrors': true
    });
    const page = await browser.newPage();
    // prevent loading other content apart from html
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() === 'document') {
            request.continue();
        } else {
            request.abort();
        }
    });

  console.log(`Navigating to ${url}...`);
  await await page.goto(url, { waitUntil: 'networkidle2' });

  let itemPromise = (url) => new Promise(async(resolve, reject) => {
      try {
        // let arrOfData = [];
        // let dataObj = {};
        // await page.waitForSelector('#productTitle');
        // dataObj['url'] = link;
        // dataObj['title'] = await page.$$eval('[class*="product-title"], [class*="productName"], [class*="product-name"], [class*="productTitle"]', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""));
        // dataObj['initialPrice'] = await page.$eval('#priceblock_ourprice', text => Number(text.textContent.replace(/[^0-9\.]+/g,"")));
        // dataObj['description'] = await page.$eval('#productDescription', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""));
        // // dataObj['imageUrl'] = await newPage.$eval('#ivLargeImage img', img => img.src);

        let product = await page.evaluate(async () => {
            let results = {};
            // Scrape title|name of product
            let items = document.querySelectorAll('[class*="product-title"], [class*="productName"], [class*="product-name"], [class*="productTitle"], .product-detail__title h1');
            items.forEach(item => {
                if (item.innerText) {
                    results.title = item.innerText.trim();
                    };
            });
            // Scrape image of product
            let img = document.querySelectorAll('.imgTagWrapper img, [class*="productImage"], .static-product-image');
            img.forEach(image => {
                if (image.src) {
                    results.imgURL = image.src;
                };
            });
            // Scrape price
            let prices = document.querySelectorAll('[class*="price"], [class*="Price"], [class*="price__total"], .price__total-value price__total--on-sale');
            prices.forEach((item) => {
                if (item.innerText) {
                    results.initialPrice = Number(item.innerText.replace(/[^0-9\.]+/g,""));
                }
            });
            // Scrape description
            let description = document.querySelectorAll('.product-description-blurb__text, [class*="description"], [class*="Description"], [id*="Description"] p');
            description.forEach((item) => {
                if (item.innerText && !results.description) {
                    results.description = item.innerText.replace(/(\r\n\t|\n|\r|\t)/gm, "");
                }
            });
            return results;
        });
        
        await page.close();
        if (!product.description) {
            product.description = product.title;
        }
        product.url = url;
        resolve(product);
        
      } catch (e) {
          return reject(e)
      }
        
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