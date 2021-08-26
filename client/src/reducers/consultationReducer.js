import { 
    GET_CONSULTATIONS, 
    GET_PATIENT_CONSULTATIONS, 
    ADD_CONSULTATION, 
    UPDATE_CONSULTATION, 
    CONSULTATIONS_LOADING, 
    CLEAR_SUCCESS
 } from "../actions/types";

const initialState = {
    consultations: [],
    patientConsultation: [],
    msg: '',
    loading: false
}

 // eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CONSULTATIONS:
            return {
                ...state,
                consultations: action.payload,
                loading: false
            }
        case GET_PATIENT_CONSULTATIONS:
            return {
                ...state,
                patientConsultation: action.payload,
                loading: false
            }
        case UPDATE_CONSULTATION:
            return {
                ...state,
                msg: action.payload.msg,
                consultations: action.payload.consultations,
                loading: false
            }
        case ADD_CONSULTATION:
            return {
                ...state,
                msg: action.payload.msg,
                consultations: [action.payload.consultation, ...state.consultations],
                loading: false
            }
            case CLEAR_SUCCESS:
                return {
                    ...state,
                   msg: '',
                   loading: false
                    };
        case CONSULTATIONS_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state;
    }
}