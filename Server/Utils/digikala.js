const request = require("request");
const fs = require("fs");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const Product = require("../Models/product");

async function scrapeListing(page, term) {
  await page.goto("https://www.digikala.com/search/?q=" + term, {
    waitUntil: "load",
    // Remove the timeout
    timeout: 0,
  });
  const html = await page.content();
  const $ = await cheerio.load(html);

  const Listings = $("div.border-b.border-l").map((index, element) => {
    const url =
      "https://www.digikala.com/" + $(element).find("a").attr("href").trim();
    return {url , site:'Digikala'}
  }).get()

//   console.log(Listings.length)
 return Listings
}

async function scrapeEachUrl(page,listings) {
    for (var i = 0; i <3; i++) {
        await page.goto(
            listings[i].url,
            {
              waitUntil: "load",
              // Remove the timeout
              timeout: 0,
            }
          );
          const Producthtml = await page.content();
          const $ = await cheerio.load(Producthtml)
    
          const title = $("h1.text-h4.color-900.mb-2").text().trim();
          listings[i].Title = title;
          // console.log(listings[i].Title)

          const description = $(".mx-5.mx-0-lg.pb-3-lg.InfoSection_infoSection__wrapper__5zrfc.border-b.pb-1").text().trim();
          listings[i].Description = description;

          const imageUrl = $("div.swiper-slide.swiper-slide-active > div > img").attr("src").trim();
          listings[i].ImageUrl = imageUrl;

          const pricelist = $("span.text-h4.ml-1.color-800").map((index, element) => {
                return $(element).text().trim()
          }).get()
          listings[i].Price = pricelist[0];

          $("li.d-flex.ai-center.mb-1").map((index, element) => {
            const itemTitle = $(element).text();
            const myArray = itemTitle.split(":");
            
            if (myArray[0].trim() == "حافظه داخلی") {
              listings[i].InternalMemory = myArray[1];
            }
      
            if (myArray[0].trim() == "مقدار RAM") {
                listings[i].Ram = myArray[1];
            }
      
            if (myArray[0].trim() == "بازه‌ی اندازه صفحه نمایش") {
                listings[i].DisplaySize = myArray[1];
            }
      
            if (myArray[0].trim() == "شبکه های ارتباطی") {
                listings[i].MobileNetwok = myArray[1];
            }
      
            if (myArray[0].trim() == "رزولوشن عکس") {
                listings[i].CameraReso = myArray[1];
            }
          });

          const listingModuls = new Product(listings[i]);
          await listingModuls.save();
    }    
}
async function DScraper(term) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const listings = await scrapeListing(page, term);
  await scrapeEachUrl(page,listings)
  browser.close();
}

module.exports = DScraper;
