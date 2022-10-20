const express = require('express');
const router = express.Router();

const { getJobs , newJob,getsingleJob ,updateJob ,deleteJob,deleteAllJob,scrapData,downloadJobExcel,downloadProExcel,scrapProduct,getProducts,getsingleProduct,deleteAllProduct,deleteProduct} = require("../Controllers/dataController");

router.route('/scrapdata/:page').get(scrapData);
router.route('/data').get(getJobs);
router.route('/data/new').post(newJob);
router.route('/data/:id').get(getsingleJob);
router.route('/data/:id').put(updateJob);
router.route('/data/:id').delete(deleteJob);
router.route('/data').delete(deleteAllJob);
router.route('/download/jobexcel').get(downloadJobExcel);
router.route('/download/proexcel').get(downloadProExcel);

router.route('/scrapproduct/:term').get(scrapProduct);
router.route('/product').get(getProducts);

router.route('/product/:id').get(getsingleProduct);

router.route('/product/:id').delete(deleteProduct);
router.route('/product').delete(deleteAllProduct);



module.exports = router;
