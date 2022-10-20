const List = require("../Models/listing");
const Product = require("../Models/product");
const jScrapper = require("../Utils/jobinjaScraper");
const pScrapper = require("../Utils/karlancerScraper");
const DScrapper = require("../Utils/digikala");
const PScrapper = require("../Utils/technolife");

const APIFeature = require("../Utils/apiFeature");

exports.newJob = async (req, res, next) => {
  const job = await List.create(req.body);
  res.status(201).json({
    success: true,
    job,
  });
};

exports.scrapData = async (req, res, next) => {
  jScrapper(req.params.page);
  await pScrapper(req.params.page);
  
  try {
    res.status(200).json({
      success: true,
      message: "داده های  با موفقیت ذخیره شد",
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getJobs = async (req, res, next) => {
  const resPerPage = 12;
  const jobsCount = await List.countDocuments();
  const apiFeature = new APIFeature(List.find(), req.query)
    .search()
    .pagination(resPerPage);
  const jobs = await apiFeature.query;
  res.status(200).json({
    success: true,
    jobsCount,
    resPerPage,
    jobs,
  });
};


exports.getsingleJob = async (req, res, next) => {
  const job = await List.findById(req.params.id);
  if (!job) {
    res.status(404).json({
      success: false,
      message: "داده مورد نظر یافت نشد",
    });
  }
  res.status(200).json({
    success: true,
    job,
  });
};

exports.updateJob = async (req, res, next) => {
  let job = await List.findById(req.params.id);
  if (!job) {
    res.status(404).json({
      success: false,
      message: "داده مورد نظر یافت نشد",
    });
  }
  job = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
  });
};
exports.deleteAllJob = async (req, res, next) => {
  const jobs = await List.deleteMany({});
  
  res.status(200).json({
    success: true,
    message: "تمام داده ها با موفقیت حذف شد",
  });
};
exports.deleteJob = async (req, res, next) => {
  const job = await List.findById(req.params.id);
  if (!job) {
    res.status(404).json({
      success: false,
      message: "داده مورد نظر یافت نشد",
    });
  }
  await job.remove();
  res.status(200).json({
    success: true,
    message: "داده مورد نظر با موفقیت حذف شد",
  });
};
exports.downloadJobExcel=async(req, res, next)=>{
  res.download(`${__dirname}/../jobs.csv`);
  
}
exports.downloadProExcel=async(req, res, next)=>{
  const excelfile = '../projects.csv';
  res.download(`${__dirname}/../projects.csv`);
}

exports.scrapProduct = async (req, res, next) => {
  
  const products = await Product.deleteMany({});
  // PScrapper(req.params.term);
  await DScrapper(req.params.term);
  
  try {
    res.status(200).json({
      success: true,
      message: "محصول های  با موفقیت ذخیره شد",
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getProducts = async (req, res, next) => {
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();
  const apiFeature = new APIFeature(Product.find(), req.query)
    .search()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    products,
  });
};


exports.getsingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "محصول مورد نظر یافت نشد",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteAllProduct = async (req, res, next) => {
  const products = await Product.deleteMany({});
  
  res.status(200).json({
    success: true,
    message: "تمام محصول ها با موفقیت حذف شد",
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "محصول مورد نظر یافت نشد",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "محصول مورد نظر با موفقیت حذف شد",
  });
};
