const scraperObject = {
    url: '',
    async scraper(browser, cb){
        console.log(`Navigating to ${this.url}...`);
        // Function to scrape date from page
        let itemPromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            await newPage.waitForSelector('#productTitle');
            dataObj['url'] = this.url;
            dataObj['title'] = await newPage.$eval('#productTitle', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""));
            dataObj['initialPrice'] = await newPage.$eval('#priceblock_ourprice', text => Number(text.textContent.replace(/[^0-9\.]+/g,"")));
            dataObj['description'] = await newPage.$eval('#productDescription', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""));
            // dataObj['imageUrl'] = await newPage.$eval('#ivLargeImage img', img => img.src);
            resolve(dataObj);
            await newPage.close();
        });

        // Navigate to the selected page
        // await page.goto(this.url);
        // await page.waitForSelector('#productTitle');
        try{
            const item = await itemPromise(this.url);
        cb(item);
        await browser.close();
        }
        catch (err) {
            console.log(err);
        }
        

        // // Wait for the required DOM to be rendered
        // await page.waitForSelector('.page_inner');
        // // Get the link to all the required books
        // let urls = await page.$eval('section ol > li', links => {
        //     // Make sure the book to be scraped is in stock
        //     links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
        //     // Extract the links from the data
        //     links = links.map(el => el.querySelector('h3 > a').href)
        //     return links;
        // });


        // open a new page instance and get the relevant data from page
        

        // for(link in urls){
        //     let currentPageData = await pagePromise(urls[link]);
        //     // scrapedData.push(currentPageData);
        //     console.log(currentPageData);
        // }

    }
}

module.exports = scraperObject;
