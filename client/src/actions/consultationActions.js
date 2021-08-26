import axios from 'axios';
import { 
  GET_CONSULTATIONS, 
  GET_PATIENT_CONSULTATIONS, 
  ADD_CONSULTATION, 
  UPDATE_CONSULTATION, 
  CONSULTATIONS_LOADING, 
  CLEAR_SUCCESS 
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//Get All Consultations from API 
export const getConsultations = () => (dispatch, getState) => {
  // Set loading
  dispatch(setConsultationsLoading());
  
  axios
  .get('/api/v1/consultations', tokenConfig(getState))
  .then(res =>
    dispatch({
      type: GET_CONSULTATIONS,
      payload: res.data
    })
    )
    .catch(err =>
      dispatch(returnErrors(err?.response?.data, err?.response?.status))
    );
};

// Add New Consultaion
export const addConsultation = data => (dispatch, getState) => {
  // Set loading
  dispatch(setConsultationsLoading());
  
  const config = {      
    method: "POST",      
    body: JSON.stringify(data),      
    headers: {
      "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": getState().auth.token
      }
  }
  // Sending a Post Request to add New Consultation
  fetch('/api/v1/consultations/add', config)
    .then((res) => res.json())
      .then(data =>
        dispatch({
          type: ADD_CONSULTATION,
          payload: data
        })
        )
      .catch(err =>
        dispatch(returnErrors(err?.response?.data, err?.response?.status))
        );
      };
      
// Upate a patient consultation
export const updateConsultation = payload => (dispatch, getState) => {
  // Set loading
  dispatch(setConsultationsLoading());
  
  const { 
    patientName,
    folderNumber,
    patientComplaint,
    doctorAssessment,
    diagnosis,
    drugsPrescribed,
    doctorName,
    id } = payload;
    
      //Request body
      const body = JSON.stringify({ 
        patientName,
        folderNumber,
        patientComplaint,
        doctorAssessment,
        diagnosis,
        drugsPrescribed,
        doctorName });
        
        const config = {      
          method: "PUT",      
          body,      
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-auth-token": getState().auth.token
          }
        }
        
        // Sending a Put Request to add Update a Patient Consultation
        fetch(`/api/v1/consultations/${id}`, config)
        .then((res) => res.json())
        .then(data => 
          dispatch({
            type: UPDATE_CONSULTATION,
            payload: data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err?.response?.data, err?.response?.status))
      );
    };
    
    // Get a Patient Consultations base on Folder Number 
    export const getPatientConsultations = id => dispatch => {
      // Set loading
      dispatch(setConsultationsLoading());
      axios
      .get(`/api/v1/consultations//${id}`)
    .then(res =>
      dispatch({
        type: GET_PATIENT_CONSULTATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err?.response?.data, err?.response?.status))
    );
};

//CLEAR ERRORS
export const clearSuccess = () => {
  return {
      type: CLEAR_SUCCESS
  };
};

// Set Consultations to Loading
export const setConsultationsLoading = () => {
  return {
    type: CONSULTATIONS_LOADING
  };
};
