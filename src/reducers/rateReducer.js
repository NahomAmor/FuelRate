const rateState = {
    rateError: null,
    profileLoad: null,
    loggedIn: null,
    signedUp: null,
    user: undefined,
    addRequst: undefined,
    getRequest: undefined,
    addRequest_Error: undefined,
    getProfile: false
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
                addRequest_Error: action.payload
            };

        case "addRequest":
            console.log("addRequest ", action.payload);
            return{
                ...state,
                addRequest: action.payload
            }
        case "getRequest":
            console.log("getRequest ", action.payload);
            return{
                ...state,
                getRequest: action.payload
            } 
        default:
            return state;


    }
};
export default rateReducer;