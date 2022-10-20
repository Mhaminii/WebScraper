import {
  DELETE_ALLPRODUCTS_REQUEST,
  DELETE_ALLPRODUCTS_SUCCESS,
  DELETE_ALLPRODUCTS_RESET,
  DELETE_ALLPRODUCTS_FAIL,
  ALL_PRODUCS_REQUEST,
  ALL_PRODUCS_SUCCESS,
  ALL_PRODUCS_FAIL,
  SCRAPEPRODUCT_REQUEST,
  SCRAPEPRODUCT_SUCCESS,
  SCRAPEPRODUCT_RESET,
  SCRAPEPRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
      };
    case ALL_PRODUCS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const scrapeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SCRAPEPRODUCT_REQUEST:
      return {
        ...state,
        scrapeLoading: true,
      };

    case SCRAPEPRODUCT_SUCCESS:
      return {
        scapeLoading: false,
        isScraped: action.payload,
      };
    case SCRAPEPRODUCT_FAIL:
      return {
        scapeLoading: false,
        error: action.payload,
      };
    case SCRAPEPRODUCT_RESET:
      return {
        ...state,
        isScraped: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteAllproductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALLPRODUCTS_REQUEST:
      return {
        Dloading: true,
        ...state,
      };

    case DELETE_ALLPRODUCTS_SUCCESS:
      return {
        Dloading: false,
        isDeleted: action.payload,
      };
    case DELETE_ALLPRODUCTS_FAIL:
      return {
        Dloading: false,
        error: action.payload,
      };
    case DELETE_ALLPRODUCTS_RESET:
      return {
        ...state,
        isDeleted: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
