import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

const initialState = {authState: {}, rateRequestState: {}};
const store = configureStore(initialState);
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
