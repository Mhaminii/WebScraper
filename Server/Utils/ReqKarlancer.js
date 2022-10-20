const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const objectsToCsv = require("objects-to-csv");
const listing = require("../Models/listing");

async function scrapeListing(page) {
  let Listings = [];
  for (var i = 1; i <= page; i++) {
    const html = await request.get(
      "https://www.karlancer.com/search?page=" + i
    );
    console.log("Scraping page :", i);
    const $ = await cheerio.load(html);
    Listings[i - 1] = $(
      ".bg-white.br-9.p-30.pb-0.text-right.position-relative.border-1-transparent"
    )
      .map((index, element) => {
        const title = $(element)
          .find(".ml-15.fs-18.font-weight-bold.d-inline")
          .text()
          .trim();
        const url =
          "https://www.karlancer.com" +
          $(element)
            .find(
              ".mt-30.d-block.d-sm-none.more-btn.w-100.bg-white.py-3.text-center.border-gray-e3.fs-15.b-500.color-black-75.br-5"
            )
            .attr("href")
            .trim();
        const expireDay = $(element)
          .find(
            ".fs-13.br-90.px-3.py-2.bg-39-color.color-white.lh-1-23.d-inline-block"
          )
          .text()
          .trim();

        const deadline = $(element)
          .find(".d-flex.mt-3.mb-10.mt-md-0.align-items-center ")
          .text()
          .trim();

        const type = "پروژه";
        const imageUrl="https://nazarkade.com/wp-content/uploads/shortlink_logos/karlancer-site-500x500.webp"

        return { title, url, expireDay, deadline, type,imageUrl };
      })
      .get();
  }
  return Listings.flat();
}

async function scrapeEachUrl(listings) {
  console.log("Srart Saving to MongoDb...");
  for (var i = 0; i < listings.length; i++) {
    const Jobhtml = await request.get(listings[i].url);
    const $ = await cheerio.load(Jobhtml);
    const projectDesc = $(".text-right.white-space-pre-line.lh-2-31.fs-14")
      .text()
      .trim();
    listings[i].projectDesc = projectDesc;

    const budget = $(".d-flex.mt-3.mt-sm-0 >div:nth-child(2)").text().trim();
    listings[i].budget = budget;

    const skills = $(".d-inline-flex.w-25-7-5.mb-10.ml-custom-10")
      .map((index, element) => {
        const skills_c = $(element).text().trim();
        return skills_c;
      })
      .get();
    listings[i].skills = skills;

    //await sleep(1000);

    const listingModuls = new listing(listings[i]);
    await listingModuls.save();
  }
  console.log("(", i, ") Project Data has been saved in MongoDb.");
  return listings;
}

async function sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}
async function createCsvFile(data) {
  const csv = new objectsToCsv(data);

  // Save to file:
  await csv.toDisk("./projects.csv", "utf8");
  console.log("csv file (Excel) for Karlancer.com created .")
}

async function pScraper(page) {
  console.log("Karlancer.com Scraping...");
  console.log("Loading...");
  const Listings = await scrapeListing(page);
  console.log("Loading...");
  const scrapeAll = await scrapeEachUrl(Listings);
  console.log("Karlancer.com Done.");
  createCsvFile(scrapeAll);
}

module.exports = pScraper;
