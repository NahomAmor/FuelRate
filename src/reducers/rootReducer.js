import { combineReducers } from "redux" ;
import authReducer from "reducers/authReducer";
import rateRequestReducer from "reducers/rateRequestReducer";

export default combineReducers({
    authState: authReducer,
    rateRequestState: rateRequestReducer
});