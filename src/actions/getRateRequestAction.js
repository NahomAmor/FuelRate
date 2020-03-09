const getRateRequestAction = () => async dispatch => {
// call database to add new request with above details

dispatch({
    type: "getRateRequest",
    payload: {}
})
}

export default getRateRequestAction;