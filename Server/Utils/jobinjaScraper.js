const puppeteer = require("puppeteer");
const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const objectsToCsv = require("objects-to-csv");
const listing = require("../Models/listing");

async function scrapeListing(page ,pageNumber) {
  let Listings = [];

  await page.goto(
    `https://jobinja.ir/login/user`,
    {
      waitUntil: "load",
      // Remove the timeout
      timeout: 0,
    }
  );

  await page.type('.o-flyForm__textInput.u-ltr:nth-of-type(2)','aminidevs@gmail.com')
  await page.type('.o-flyForm__textInput.u-ltr:nth-of-type(3)', 'Mohammad1379')
  await page.click('.c-btn.c-btn--primary.c-btn--blockFullWidth')
  for (var i = 1; i <= pageNumber; i++) {
    
    await page.goto(
      `https://jobinja.ir/jobs?&page=`+ i,
      {
        waitUntil: "load",
        // Remove the timeout
        timeout: 0,
      }
    );
    const html = await page.content();

    console.log("Scraping page :", i);
    const $ = await cheerio.load(html);
    Listings[i - 1] = $(".o-listView__itemInfo")
      .map((index, element) => {
        const titleElement = $(element).find(".c-jobListView__titleLink");
        const title = $(titleElement).text().trim();
        const url = $(titleElement).attr("href").trim();
        const passedDayElement = $(element).find(".c-jobListView__passedDays");
        const imageUrl = $(element)
          .find(".o-listView__itemIndicatorImage")
          .attr("src");
        const passedDay = $(passedDayElement)
          .text()
          .trim()
          .replace("(", "")
          .replace(")", "");
        const companyElement = $(element).find(
          ".c-jobListView__metaItem:first-child span "
        );
        const company = $(companyElement).text().trim();
        const cityElement = $(element).find(
          ".c-jobListView__metaItem:nth-child(2) span "
        );
        const city = $(cityElement).text().trim();
        const type = "شغل";
        return { title, company, city, url, passedDay, type, imageUrl };
      })
      .get();
  }
  return Listings.flat();
}

async function scrapeEachUrl(page,listings) {
  console.log("Srart Saving to MongoDb...");
  for (var i = 0; i < listings.length; i++) {
    
    await page.goto(
      listings[i].url,
      {
        waitUntil: "load",
        // Remove the timeout
        timeout: 0,
      }
    );
    const Jobhtml = await page.content();

    const $ = await cheerio.load(Jobhtml);
    const JobDes = $(".s-jobDesc").text().trim();
    listings[i].JobDes = JobDes;
    const JobType = $(
      "ul.c-jobView__firstInfoBox > li:nth-child(1) > div > span"
    )
      .text()
      .trim();
    listings[i].JobType = JobType;

    const contractType = $(
      "ul.c-jobView__firstInfoBox > li:nth-child(3) > div > span"
    )
      .text()
      .trim();
    listings[i].contractType = contractType;

    const Experience = $(
      "ul.c-jobView__firstInfoBox > li:nth-child(4) > div > span"
    )
      .text()
      .trim();
    listings[i].Experience = Experience;

    const salary = $(
      "ul.c-jobView__firstInfoBox > li:nth-child(5) > div > span"
    )
      .text()
      .trim();
    listings[i].salary = salary;

    $("ul.c-infoBox:nth-of-type(2) > li").map((index, element) => {
      const i_titleElement = $(element).find("h4.c-infoBox__itemTitle");
      const itemTitle = $(i_titleElement).text();

      if (itemTitle == "زبان‌های مورد نیاز") {
        const reqLanguage = $(element).find("div > span").text().trim();
        listings[i].reqLanguage = reqLanguage;
      }

      if (itemTitle == "مهارت‌های مورد نیاز") {
        const skills = $(element)
          .find("div > span")
          .map((index, element) => {
            const skills_c = $(element).text().trim();
            return skills_c;
          })
          .get();
        listings[i].skills = skills;
      }

      if (itemTitle == "جنسیت") {
        const gender = $(element).find("div > span").text().trim();
        listings[i].gender = gender;
      }

      if (itemTitle == "وضعیت نظام وظیفه") {
        const militaryService = $(element).find("div > span").text().trim();
        listings[i].militaryService = militaryService;
      }

      if (itemTitle == "حداقل مدرک تحصیلی") {
        const degree = $(element).find("div > span").text().trim();
        listings[i].degree = degree;
      }
    });

    //await sleep(1000);

    const listingModuls = new listing(listings[i]);
    await listingModuls.save();
  }
  console.log("(", i, ")Job Data has been saved in MongoDb.");
  return listings;
}

async function sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}
async function createCsvFile(data) {
  const csv = new objectsToCsv(data);

  // Save to file:
  await csv.toDisk("./jobs.csv", "utf8");
  console.log("csv file (Excel) for Jobinja.ir created .");
}

async function jScraper(pageNumber) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  console.log("Jobinja.ir Scraping...");
  console.log("Loading...");
  const Listings = await scrapeListing(page , pageNumber);
  console.log("Loading...");
  const scrapeAll = await scrapeEachUrl(page,Listings);
  console.log("Jobinja.ir Done.");
  createCsvFile(scrapeAll);
}

module.exports = jScraper;
