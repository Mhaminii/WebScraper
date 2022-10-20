const request = require("request");
const fs = require("fs");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const Product = require("../Models/product");

async function scrapeListing(page, term) {
  await page.goto("https://www.technolife.ir/product/list/search?keywords=" + term, {
    waitUntil: "load",
    // Remove the timeout
    timeout: 0,
  });
  const html = await page.content();
  const $ = await cheerio.load(html);

  const Listings = $("li.ProductPrlist_product__3oA2g.ProductComp_product__3o3Lh").map((index, element) => {
    const url =
      "https://www.technolife.ir/" + $(element).find("a").attr("href").trim();
    return {url , site:'Technolife'}
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
    
          const title = $("h1 > strong").text().trim();
          listings[i].Title = title;
          // console.log(listings[i].Title)

          const description = $(".product_technical__28clA").text().trim();
          listings[i].Description = description;

          const imageUrl = $("div.product_window__6C8HU > div > img").attr("src").trim();
          listings[i].ImageUrl = imageUrl;
          // console.log(listings[i].ImageUrl)

          const pricelist = $(".product_productPrice__jgJIR > div > h6 > span").map((index, element) => {
                return $(element).text().trim()
          }).get()
          listings[i].Price = pricelist[0];

          $("li.order_summary_pdp > h3").map((index, element) => {
            const itemTitle = $(element).text();
            const myArray = itemTitle.split(":");
            
            if (myArray[0].trim() == "حافظه داخلی") {
              listings[i].InternalMemory = myArray[1];
            }
      
            if (myArray[0].trim() == "حافظه RAM") {
                listings[i].Ram = myArray[1];
            }
      
            if (myArray[0].trim() == "سایز صفحه نمایش") {
                listings[i].DisplaySize = myArray[1];
            }
      
            if (myArray[0].trim() == "ظرفیت باتری") {
                listings[i].Battery = myArray[1];
            }
      
            if (myArray[0].trim() == "کیفیت دوربین") {
                listings[i].CameraReso = myArray[1];
            }
          });
          const listingModuls = new Product(listings[i]);
          await listingModuls.save();
    }    
}
async function TScraper(term) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const listings = await scrapeListing(page, term);
  await scrapeEachUrl(page,listings)
  browser.close();
}

module.exports = TScraper;
