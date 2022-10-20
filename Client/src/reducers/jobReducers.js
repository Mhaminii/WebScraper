import {
  ALL_JOBS_REQUEST,
  ALL_JOBS_SUCCESS,
  ALL_JOBS_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  SCRAPEDATA_REQUEST,
  SCRAPEDATA_SUCCESS,
  SCRAPEDATA_RESET,
  SCRAPEDATA_FAIL,
  DELETE_ALLJOB_REQUEST,
  DELETE_ALLJOB_SUCCESS,
  DELETE_ALLJOB_RESET,
  DELETE_ALLJOB_FAIL,
  DOWNLOAD_JOB_REQUEST,
  DOWNLOAD_JOB_SUCCESS,
  DOWNLOAD_JOB_FAIL,
  DOWNLOAD_JOB_RESET,
  DOWNLOAD_PROJECT_REQUEST,
  DOWNLOAD_PROJECT_SUCCESS,
  DOWNLOAD_PROJECT_FAIL,
  DOWNLOAD_PROJECT_RESET,
  CLEAR_ERRORS,
} from "../constants/jobConstants";

export const jobDetailsReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case JOB_DETAILS_SUCCESS:
      return {
        loading: false,
        job: action.payload,
      };
    case JOB_DETAILS_FAIL:
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
export const jobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case ALL_JOBS_REQUEST:
      return {
        loading: true,
        jobs: [],
      };

    case ALL_JOBS_SUCCESS:
      return {
        loading: false,
        jobs: action.payload.jobs,
        jobsCount: action.payload.jobsCount,
        resPerPage: action.payload.resPerPage,
      };
    case ALL_JOBS_FAIL:
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
export const scrapeDataReducer = (state = {}, action) => {
  switch (action.type) {
    case SCRAPEDATA_REQUEST:
      return {
        ...state,
        scrapeLoading: true,
      };

    case SCRAPEDATA_SUCCESS:
      return {
        scapeLoading: false,
        isScraped: action.payload,
      };
    case SCRAPEDATA_FAIL:
      return {
        scapeLoading: false,
        error: action.payload,
      };
    case SCRAPEDATA_RESET:
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
export const deleteAlljobReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALLJOB_REQUEST:
      return {
        Dloading: true,
        ...state,
      };

    case DELETE_ALLJOB_SUCCESS:
      return {
        Dloading: false,
        isDeleted: action.payload,
      };
    case DELETE_ALLJOB_FAIL:
      return {
        Dloading: false,
        error: action.payload,
      };
    case DELETE_ALLJOB_RESET:
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
export const downloadJobReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_JOB_REQUEST:
      return {
        ...state,
        JDLoading: true,
      };

    case DOWNLOAD_JOB_SUCCESS:
      return {
        JDLoading: false,
        isJDownloaded: action.payload,
      };
    case DOWNLOAD_JOB_FAIL:
      return {
        JDLoading: false,
        error: action.payload,
      };
    case DOWNLOAD_JOB_RESET:
    return {
      ...state,
      isJDownloaded: true,
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
export const downloadProReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_PROJECT_REQUEST:
      return {
        ...state,
        PDLoading: true,
      };

    case DOWNLOAD_PROJECT_SUCCESS:
      return {
        PDLoading: false,
        isPDownloaded: action.payload,
      };
    case DOWNLOAD_PROJECT_FAIL:
      return {
        PDLoading: false,
        error: action.payload,
      };
    case DOWNLOAD_PROJECT_RESET:
    return {
      ...state,
      isPDownloaded: true,
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
