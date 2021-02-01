const puppeteer = require('puppeteer');
// Scraper function to get item info from website
// Initialize puppeteer
async function scrapeItem(url, cb) {
    // Shorten url if there is a '?' after url for params
    url = url.substring(0, url.indexOf('?') === -1 ? url.length: url.indexOf('?'));
    try {
    const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Updated args to run on heroku
    'ignoreHTTPSErrors': true
    });
    // create instance of new browser page
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

    async function cleanup() {
        try {
          console.log("Cleaning up instances");
          await page.close();
          await browser.close();
        } catch (e) {
          console.log("Cannot cleanup istances");
        }
      }
  
  
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2' }); // wait till html is loaded
  
    // function - promise to scrape and return item object
    let itemPromise = (url) => new Promise(async(resolve, reject) => {
        let product = await page.evaluate(async () => {
            let results = {};
            // Scrape title|name of product
            let items = document.querySelectorAll(`.pdp-header__product-name, .page-title > span, [class*="product-title"], 
                  [class*="productName"], [class*="product-name"], [class*="productTitle"], .product-detail__title h1, 
                  [class*="mainColumn-"] div [class*="title-"], #itemTitle`);

            items.forEach(item => {
                if (item.innerText !== "") {
                    results.title = item.innerText.trim();
                };
            });
            
            const amazonTitle = document.querySelector('#productTitle')

            if (amazonTitle) {
                results.title = amazonTitle.innerText.trim();
            }

            // Scrape image of product
            let img = document.querySelectorAll(`.imgTagWrapper img, [class*="productImage"], .static-product-image, 
                                                    [class*="heroImageForPrint"]`);
            img.forEach(image => {
                if (image.src) {
                    results.imgURL = image.src;
                };
            });
            // Get image from meta tag if not present in class selector
            if (!results.imgURL ) {
                 const imgEl = document.querySelector("meta[property='og:image']");
                 if (imgEl) {
                    results.imgURL = imgEl.getAttribute('content');
                 }
            }
            let ebayImg = document.querySelector('#viEnlargeImgLayer_layer_fs_thImg0 > table > tr> td > div > img');
            if (ebayImg) {
                results.imgURL = ebayImg.src;
            };

            // Scrape price
            let prices = document.querySelectorAll(`[class*="price"], [class*="Price"], [class*="price__total"], 
                                                    .price__total-value price__total--on-sale`);
            let amazonPrice = document.querySelector('#priceblock_ourprice');
            let amazonPrice1 = document.querySelector('#priceblock_saleprice');
            let ebayPrice = document.querySelector('#prcIsum');
            let bestBuyPrice = document.querySelector('.screenReaderOnly_3anTj');
            const getOutsideShoesPrice = document.querySelector('.product-info-price .price');
            prices.forEach((item) => {
                if (item.innerText) {
                    results.initialPrice = Number(item.innerText.replace(/[^0-9\.]+/g,""));
                }
            });
            if (amazonPrice) {
                if (amazonPrice.innerText) {
                    results.initialPrice = Number(amazonPrice.innerText.replace(/[^0-9\.]+/g,""));
                }
            };
            if (amazonPrice1) {
                if (amazonPrice1.innerText) {
                    results.initialPrice = Number(amazonPrice1.innerText.replace(/[^0-9\.]+/g,""));
                }
            };

            if (ebayPrice) {
                results.initialPrice = Number(ebayPrice.innerText.replace(/[^0-9\.]+/g,""));
            };

            if (bestBuyPrice) {
                results.initialPrice = Number(bestBuyPrice.innerText.replace(/[^0-9\.]+/g,""));
            };

            if (getOutsideShoesPrice) {
                results.initialPrice = Number(getOutsideShoesPrice.innerText.replace(/[^0-9\.]+/g,""));
            };

            // Scrape description
            let description = document.querySelectorAll(`.product-description-blurb__text, [class*="description"], [class*="Description"], 
                                                            [id*="Description"] p, #viTabs_0_is`);
            let amazonDescription = document.querySelector('#feature-bullets');
            if (amazonDescription) {
                amazonDescription = amazonDescription.innerHTML;
            }
            description.forEach((item) => {
                if (amazonDescription) {
                    results.description = amazonDescription.replace(/<hr>/gm, "");
                } else {
                    if (item.innerText && !results.description) {
                        results.description = item.innerText;
                    }
                }
            });
            // If could not scrape description add title as description
            if (!results.description) {
                results.description = results.title;
            }
            return results;
        });
        
        if (!product.imgURL) {
            product.imgURL = "/images/blank.gif";
        };
        product.url = url;
        resolve(product);
        reject('Unable!')
    });

        const item = await itemPromise(url);
        cb(item);
        await cleanup();
    }
    catch (err) {
        console.log('unable to get', err);
        cb(err);
        await cleanup();
    }
    
};

module.exports = scrapeItem;
