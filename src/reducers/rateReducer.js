const rateState = {
    rateError: null,
    profileLoad: null,
    loggedIn: null,
    signedUp: null,
    user: undefined,
    predicted: undefined,
    getRequest: undefined,
    addError: undefined,
    getProfile: false,
    suggested: 0,
    request: null,
    due: 0
}

const rateReducer =(
    state=rateState,
    action
) => {
    switch (action.type) {
        case "Profile_updated":
            console.log("profileLoaded: ", action.payload);
            return {
                ...state,
                profileLoaded: action.payload                
        }
        case "Profile_error":
            console.log("profileNotLoaded: ", action.payload);
            return {
                ...state,
                profileLoaded: action.payload                
        }
        case "addRequest_Error":
            console.log("adding error: ", action.payload.err);
            return {
                ...state,
                predicted: action.payload,
                addError: action.payload.err
            };

        case "addRequest":
            console.log("addRequest ", action.payload);
            return{
                ...state,
                predicted: action.payload
            }
        case "getRequest":
            console.log("getRequest ", action.payload, action.request, action.suggested, action.due);
            return{
                ...state,
                getRequest: action.payload,
                predicted: action.payload,
                request: action.request,
                suggested: action.suggested.toFixed(2),
                due: action.due.toFixed(2)
            } 
        default:
            return state;


    }
};
export default rateReducer;