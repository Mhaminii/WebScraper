import axios from "axios";

import {
  DELETE_ALLPRODUCTS_REQUEST,
  DELETE_ALLPRODUCTS_SUCCESS,
  DELETE_ALLPRODUCTS_FAIL,
  ALL_PRODUCS_REQUEST,
  ALL_PRODUCS_SUCCESS,
  ALL_PRODUCS_FAIL,
  SCRAPEPRODUCT_REQUEST,
  SCRAPEPRODUCT_SUCCESS,
  SCRAPEPRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getproducts =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCS_REQUEST });

      let link = `/product?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);
      console.log(data)  
      dispatch({
        type: ALL_PRODUCS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const scrapeProducts =
  (term = "آیفون") =>
  async (dispatch) => {
    try {
      dispatch({ type: SCRAPEPRODUCT_REQUEST });

      await axios.get(`/scrapproduct/${term}`);
      const { data } = await axios.get("/product");

      dispatch({
        type: SCRAPEPRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SCRAPEPRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteAllPro = () => async (dispatch) => {
    try {

        dispatch({ type:  DELETE_ALLPRODUCTS_REQUEST })
        const { data } = await axios.delete('/product')

        dispatch({
            type:  DELETE_ALLPRODUCTS_SUCCESS,     
            payload:data
        })

    } catch (error) {
        dispatch({
            type:  DELETE_ALLPRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
