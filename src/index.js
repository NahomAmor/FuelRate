import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
// import configureStore from "./store";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
// import { verifyAuth } from "./actions/";
import rootReducer from "reducers/rootReducer";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";
// import { createFirestoreInstance } from "redux-firestore";
import firebaseConfig from "./firebaseConfig";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
// import { composeWithDevTools } from "redux-devtools-extension";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// const initialState = {authState: {}, rateRequestState: {}};
// const store = configureStore(initialState);
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(firebaseConfig, {useFirestoreForProfile: true, userProfile: 'Profiles', attachAuthIsReady: true}),
    reduxFirestore(firebaseConfig) // redux bindings for firestore
  )
);
store.firebaseAuthIsReady.then(() =>{
  ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" render={props => <Auth {...props} />} />
            <Route path="/admin" render={props => <Admin {...props} />} />
            <Redirect from="*" to="/auth/login"  />
          </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
})

