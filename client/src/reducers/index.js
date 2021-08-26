import { combineReducers } from "redux";
import consultationReducer from "./consultationReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
    consultation: consultationReducer,
    error: errorReducer,
    auth: authReducer
})