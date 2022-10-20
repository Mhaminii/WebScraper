import React, { Fragment} from "react";
import {Link} from 'react-router-dom'

const Home = ({ match }) => {
    return (
      <Fragment>
            <p> </p>
            <h4>برنامه اول </h4>
            <p>جستوجو کننده آگهی های شغلی </p>
            <Link to={`/jobsApplication`} id="view_btn" className="btn btn-primary">
                Job Scrapper
            </Link>
            <p> </p>
            <p> </p>
            <hr />

            <h4>برنامه دوم</h4>
            <p>مقایسه کننده قیمت  </p>
            <Link to={`/ProductApplication`} id="view_btn" className="btn btn-primary">
               Product Scrapper
            </Link>

            <hr />

        
      </Fragment>
    );
  };
  
  export default Home;