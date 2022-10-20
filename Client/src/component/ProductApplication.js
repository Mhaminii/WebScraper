import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  getproducts,
  scrapeProducts,
  deleteAllPro,
} from "../actions/productActions";

import {
  SCRAPEPRODUCT_RESET,
  DELETE_ALLPRODUCTS_RESET,
} from "../constants/productConstant";

import Product from "./job/Product";
const Home1 = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { loading, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const { scrapeLoading, isScraped } = useSelector((state) => state.scrapeProducts);
  const { Dloading, isDeleted } = useSelector((state) => state.deleteAllpro);
  

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(getproducts(keyword, currentPage));
    if (isScraped) {
      dispatch({ type: SCRAPEPRODUCT_RESET });
    }
    if (isDeleted) {
      dispatch({ type: DELETE_ALLPRODUCTS_RESET });
    }
    
  }, [
    dispatch,
    currentPage,
    keyword,
    isScraped,
    isDeleted,
  ]);

  const [termS, settermS] = useState("");


  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  function scrapeDataHandler() {
    dispatch(scrapeProducts(termS));
  }
  function deleteAllHandler() {
    dispatch(deleteAllPro());
  }
  
  return (
    <Fragment>
      {loading || scrapeLoading || Dloading? (
           <Loader/>
      ) : (
        <Fragment>
          <hr/>
          <h5>count : {productsCount}</h5>
          <hr />
          <form onSubmit={scrapeDataHandler} class="clearfix mb-2 mt-2">

            <input
            className="pl-2" 
              type="search"
              id="ScapeInput"
              required="required"
              placeholder="جستوجو محصول ...."
              onChange={(e) => settermS(e.target.value)} 
            />
            <button type="submit" class="btn btn-primary ml-2" value="Submit">
              Find product <i className="fa fa-file"></i>
            </button>
          </form>
          <div>
          <hr/>
          </div>
          <button
            className="btn btn-danger ml-2 "
            onClick={() => deleteAllHandler()}
            disabled={!productsCount || productsCount===0}
          >
            Delete All <i className="fa fa-trash"></i>
          </button>
          <hr />
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map((product) => <Product key={product._id} product={product} />)}
            </div>
          </section>

          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={">"}
              prevPageText={"<"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass={"page-item"}
              linkClass={"page-link"}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home1;
