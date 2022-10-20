import React, { Fragment, useEffect } from "react";
import Loader from '../layout/Loader'


import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getjobDetails} from "../../actions/jobActions";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { loading, job } = useSelector((state) => state.jobDetails);

  useEffect(() => {
    dispatch(getjobDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaData title={job.title} />
          <hr />
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-5 mt-5"> 
            <img
                className="w-40 text-center"
                src={job.imageUrl}
                alt={job.title} 
              />  
              <hr/>
              <h3>{job.title}</h3>
              <p id="product_id"> (شغل یا پروژه)# {job._id}</p>
              <hr />
              <p id="product_price">
              {job.company}{job.expireDay}
              </p>
              <hr />
              <p id="product_price">
              <p className="card-text">{job.city}{job.deadline}</p>
              </p>
              <hr />
              <p id="product_price">
              <p className="card-text">{job.JobType}</p>
              </p>
              <hr />
              <h4 className="mt-2">حقوق یا بودجه</h4>
              <p id="product_price">
                {job.salary} 
                {job.budget} 
              </p>
              <hr />
              <h4 className="mt-2">توضیحات:</h4>
              <p>
                {job.JobDes}
                {job.projectDesc}
              </p>
              <hr />
              <a href={job.url} id="view_btn" className="btn btn-primary">
                مشاهده در سایت
              </a>
              <hr />
            </div>
          </div>
          <hr />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
