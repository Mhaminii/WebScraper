import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Search from "./Search";
import "../../header.css";
const Header = () => {
  return (
    <Fragment>
      <div class="super_container">
        <header class="header">
          <div class="top_bar">
            <div class="container">
              <div class="row">
                <div class="col d-flex flex-row">
                  <div class="top_bar_contact_item">
                    <div class="top_bar_icon "></div>
                    <a href="/">MohammadHasan Amini</a>
                  </div>
                  <div class="top_bar_contact_item">
                    <div class="top_bar_icon"></div>
                    <a href="/">StudentNumber : 976003195</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="header_main">
            <div class="container">
              <div class="row">
                <div class="col-lg-2 col-sm-3 col-3 order-1">
                  <div class="logo_container">
                    <div class="logo">
                      <a href="/">Scraper</a>
                    </div>
                  </div>
                </div>

                <div
                  class="
                  col-lg-6 col-12
                  order-lg-2 order-3
                  text-lg-left text-right
                "
                >
                  <div class="header_search ">
                    <div class="header_search_content">
                      <div class="header_search_form_container">
                          <Route
                            render={({ history }) => (
                              <Search history={history} />
                            )}
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
};

export default Header;
