import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  getjobs,
  scrapeData,
  deleteAll,
  downloadJExcel,
  downloadPExcel,
} from "../actions/jobActions";
import {
  SCRAPEDATA_RESET,
  DELETE_ALLJOB_RESET,
  DOWNLOAD_JOB_RESET,
  DOWNLOAD_PROJECT_RESET,
} from "../constants/jobConstants";

import Job from "./job/Job";

const Home = ({ match }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { loading, jobs, jobsCount, resPerPage } = useSelector(
    (state) => state.jobs
  );
  
  const { scrapeLoading, isScraped } = useSelector((state) => state.scrapeData);


  const { Dloading, isDeleted } = useSelector((state) => state.deleteAlldata);
  const { JDLoading, isDownloaded } = useSelector((state) => state.downloadJob);
  const { PDLoading, isDownloaded: PisDownloaded } = useSelector(
    (state) => state.downloadPro
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(getjobs(keyword, currentPage));

    if (isScraped) {
      dispatch({ type: SCRAPEDATA_RESET });
    }
    if (isDeleted) {
      dispatch({ type: DELETE_ALLJOB_RESET });
    }
    if (isDownloaded) {
      dispatch({ type: DOWNLOAD_JOB_RESET });
    }
    if (PisDownloaded) {
      dispatch({ type: DOWNLOAD_PROJECT_RESET });
    }
  }, [
    dispatch,
    currentPage,
    keyword,
    isScraped,
    isDeleted,
    isDownloaded,
    PisDownloaded,
  ]);

  const [pageS, setPageS] = useState("");


  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  function scrapeDataHandler() {
    dispatch(scrapeData(pageS));
  }
  function deleteAllHandler() {
    dispatch(deleteAll());
  }
  function downloadJHandler() {
    dispatch(downloadJExcel());
  }
  function downloadPHandler() {
    dispatch(downloadPExcel());
  }

  return (
    <Fragment>
      {loading || scrapeLoading || Dloading || JDLoading || PDLoading ? (
           <Loader/>
      ) : (
        <Fragment>
          <hr/>
          <h5>count : {jobsCount}</h5>
          <hr />
          <form onSubmit={scrapeDataHandler} class="clearfix mb-2 mt-2">
          <label className="mr-2" for="ScapeInput">Number of page : </label>
            <input
            className="pl-2" 
              type="number"
              min="1"
              id="ScapeInput"
              required="required"
              placeholder="page"
              onChange={(e) => setPageS(e.target.value)} 
            />
            <button type="submit" class="btn btn-primary ml-2" value="Submit">
              Scrap <i className="fa fa-file"></i>
            </button>
          </form>
          <div>
          <h5 className="ml-2">from jobinja.ir and karlancer.com</h5>
          <hr/>
          </div>
          <button
            className="btn btn-danger ml-2 "
            onClick={() => deleteAllHandler()}
            disabled={!jobsCount || jobsCount===0}
          >
            Delete All <i className="fa fa-trash"></i>
          </button>
          <button
            className="btn btn-success ml-2 "
            onClick={() => downloadJHandler()}
            disabled={!jobsCount || jobsCount===0}
          >
            Download jobs csv <i className="fa fa-file-excel-o"></i>
          </button>
          <button
            className="btn btn-success ml-2 "
            onClick={() => downloadPHandler()}
            disabled={!jobsCount || jobsCount===0}

          >
            Download Projects csv <i className="fa fa-file-excel-o"></i>
          </button>
          <hr />

          <section id="jobs" className="container mt-5">
            <div className="row">
              {jobs && jobs.map((job) => <Job key={job._id} job={job} />)}
            </div>
          </section>

          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={jobsCount}
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

export default Home;
