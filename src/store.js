import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
// import { verifyAuth } from "./actions/";
import rootReducer from "reducers/rootReducer";

function configureStore(
    state = {
        authState: {},
        rateRequestState: {}
    }
) {
    return createStore(
      rootReducer,
      state,
      applyMiddleware(reduxThunk)
    )
  }

  export default configureStore;