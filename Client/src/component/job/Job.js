import React from "react";
import {Link} from 'react-router-dom'
import "../../App.css"

function Job({ job }) {
  return (
    
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-4 rounded">
        <img
          className="card-img-top pic-size"
          src={job.imageUrl}
          alt="pimg"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
          </h5>
            <hr/>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews"></span>
            <p className="card-text">نوع آگهی : {job.type}</p>
            <p className="card-text">{job.company}{job.expireDay}</p>
            <p className="card-text">{job.city}{job.deadline}</p>
            <p className="card-text">{job.JobType}</p>
            {/* <p className="card-text">{job.JobDes}{job.projectDesc}</p> */}
            <p className="card-text">مهارت های مورد نیاز  : {job.skills[0]}-{job.skills[1]}-{job.skills[2]}</p>
            <p className="card-text">حقوق/بودحه  :{job.salary}{job.budget}</p>

            <Link to={`/jobs/${job._id}`} id="view_btn" className="btn btn-primary">
              مشاهده
            </Link> 
            
            {/* <a href={job.url} id="view_btn" className="btn btn-primary">
               مشاهده در سایت
            </a> */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
