import axios from 'axios';

import {
    ALL_JOBS_REQUEST,
    ALL_JOBS_SUCCESS,
    ALL_JOBS_FAIL,
    JOB_DETAILS_REQUEST,
    JOB_DETAILS_SUCCESS,
    JOB_DETAILS_FAIL,
    SCRAPEDATA_REQUEST,
    SCRAPEDATA_SUCCESS,
    SCRAPEDATA_FAIL,
    DELETE_ALLJOB_REQUEST ,
    DELETE_ALLJOB_SUCCESS ,
    DELETE_ALLJOB_FAIL,
    DOWNLOAD_JOB_REQUEST,
    DOWNLOAD_JOB_SUCCESS,
    DOWNLOAD_JOB_FAIL,
    DOWNLOAD_PROJECT_REQUEST,
  DOWNLOAD_PROJECT_SUCCESS,
  DOWNLOAD_PROJECT_FAIL,
    CLEAR_ERRORS

} from '../constants/jobConstants'

export const getjobs = (keyword='',currentPage=1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_JOBS_REQUEST })

        let link = `/data?keyword=${keyword}&page=${currentPage}`

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_JOBS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_JOBS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getjobDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: JOB_DETAILS_REQUEST })

        const { data } = await axios.get(`/data/${id}`)

        dispatch({
            type: JOB_DETAILS_SUCCESS,
            payload: data.job
        })

    } catch (error) {
        dispatch({
            type: JOB_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const scrapeData = (pageS=1) => async (dispatch) => {
    try {

        dispatch({ type: SCRAPEDATA_REQUEST })

        await axios.get(`/scrapdata/${pageS}`)
        const { data } = await axios.get('/data')

        dispatch({
            type: SCRAPEDATA_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: SCRAPEDATA_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteAll = () => async (dispatch) => {
    try {

        dispatch({ type:  DELETE_ALLJOB_REQUEST })
        const { data } = await axios.delete('/data')

        dispatch({
            type:  DELETE_ALLJOB_SUCCESS,     
            payload:data
        })

    } catch (error) {
        dispatch({
            type:  DELETE_ALLJOB_FAIL,
            payload: error.response.data.message
        })
    }
}
export const downloadJExcel = () => async (dispatch) => {
    try {

        dispatch({ type: DOWNLOAD_JOB_REQUEST })

        //  await axios.get('/download/jobexcel')
        // const { data } = await axios.get('/data')
        axios({
            url: '/download/jobexcel',
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'job.csv');
            document.body.appendChild(link);
            link.click();
          });
 
        dispatch({
            type: DOWNLOAD_JOB_SUCCESS,
            //  payload:data
        })
    } catch (error) {
        dispatch({
            type: DOWNLOAD_JOB_FAIL,
            payload: error.response.data.message
        })
    }
}
export const downloadPExcel = () => async (dispatch) => {
    try {

        dispatch({ type: DOWNLOAD_PROJECT_REQUEST })

        //  await axios.get('/download/jobexcel')
        // const { data } = await axios.get('/data')
        axios({
            url: '/download/proexcel',
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'project.csv');
            document.body.appendChild(link);
            link.click();
          });
 
        dispatch({
            type: DOWNLOAD_PROJECT_SUCCESS,
            //  payload:data
        })
    } catch (error) {
        dispatch({
            type: DOWNLOAD_PROJECT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
} 