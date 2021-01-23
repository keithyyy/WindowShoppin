const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, url, cb){
    let browser;
    pageScraper.url = url // 'https://www.amazon.ca/DJI-Mini-Ultralight-Quadcopter-Transmission/dp/B08JGYF5W1';
    try{
        browser = await browserInstance;
        await pageScraper.scraper(browser, cb);

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, url, cb) => scrapeAll(browserInstance, url, cb);
