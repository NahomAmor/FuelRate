const addRateRequestAction = (
    requestName,
    requestDescription,
    requestForm,
    requestReport,
) => async dispatch => {
// call database to add new request with above details

dispatch({
    type: "addRateRequest",
    payload: {
        requestName: requestName,
        requestDescription: requestDescription,
        requestForm: requestForm,
        requestReport: requestReport
    }
})
}

export default addRateRequestAction;