import { combineReducers } from "redux" ;
import authReducer from "reducers/authReducer";
import rateReducer from "reducers/rateReducer";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
// import { reducer as reduxFormReducer } from 'redux-form';
const rootReducer = combineReducers({
    authState: authReducer,
    rateState: rateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
    // form: reduxFormReducer
});

export default rootReducer;