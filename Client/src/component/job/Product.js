import React from "react";
import {Link} from 'react-router-dom'
import "../../App.css"

function Product({ product }) {
  return (
    
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-4 rounded">
        <img
          className="card-img-top pic-size"
          src={product.ImageUrl}
          alt="pimg"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
           {product.Title}
          </h5>
            <hr/>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews"></span>
            <p className="card-text">نام سایت  : {product.site}</p>
            <p className="card-text"> </p>
            <p className="card-text"><h2>قیمت : {product.Price} </h2></p>
            <p className="card-text"> توضیحات :</p>
            <p className="card-text">{product.Description}</p>
            {/* <p className="card-text"> مشخصات :</p>
            <p className="card-text">حافظه داخلی  : {product.InternalMemory}</p>
            <p className="card-text">مقدار رم  :{product.Ram}</p>
            <p className="card-text">اندازه صفحه نمایش  : {product.DisplaySize}</p>
            <p className="card-text">کیفیت دوربین  :{product.CameraReso}</p>
            <p className="card-text">باتری  : {product.Battery}</p>
            <p className="card-text">شبکه همراه  :{product.MobileNetwok}</p> */}

            <a href={product.url} id="view_btn" className="btn btn-primary">
               مشاهده در سایت
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
