// import { applyMiddleware, createStore, compose } from "redux";
// import thunk from "redux-thunk";
// // import { verifyAuth } from "./actions/";
// import rootReducer from "reducers/rootReducer";
// import { reduxFirestore, getFirestore } from 'redux-firestore';
// import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// // import firebase from "./firebaseConfig";
// import firebase from "firebase/app";
// import'firebase/firestore'
// import 'firebase/auth'

// const Config = {
//     apiKey: "AIzaSyAuosx4sjERblWYTk1nWod7bgnVOa9RsjQ",
//     authDomain: "fuel-predictor.firebaseapp.com",
//     databaseURL: "https://fuel-predictor.firebaseio.com",
//     projectId: "fuel-predictor",
//     storageBucket: "fuel-predictor.appspot.com",
//     messagingSenderId: "647415020588",
//     appId: "1:647415020588:web:671c48161defb912a56589",
//     measurementId: "G-L99BTP9W34"
// };
// firebase.initializeApp(Config);
// firebase.firestore();
// function configureStore(
//     state = {
//         authState: {},
//         rateRequestState: {}
//     }
// ) {
//     return createStore(
//       rootReducer,
//       state,
//       compose(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), reduxFirestore(firebase), reactReduxFirebase(firebase)
//       )
//     )
//   }

//   export default configureStore;