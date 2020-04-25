const authState = {
    authError: null,
    registered: null,
    loggedIn: null,
    signedUp: null,
}

const authReducer= (
    state= authState,
    action
) => {
    switch (action.type) {
        case "register":
            console.log("registered");
            return {
                ...state,
                registered: true
        }
        case "false_register":
            console.log("not registered");
            return {
                ...state,
                registered: false
        }
        case "signedUp":
            console.log("Signed Up");
            return {
                ...state,
                registered: true,
                loggedIn: action.payload,
                signedUp: action.payload
        }
        case "signUp_Error":
            console.log("sign up error", action.err.message);
            return {
                ...state,
                authError: action.err.message,
                signedUp: action.payload
        }

        case "login_Error":
            console.log("login error ");
            return{
                ...state,
                authError: 'Login failed: '+ action.err.message,
                loggedIn: action.payload
        }

        case "login":
            console.log("logged In ", action.prof);
            return{
                ...state,
                authError: null,
                loggedIn: action.payload,
                signedUp: false,
        }

        case "logout":
            console.log(
                "logging out",
                action.payload, 
            );
            return{
                ...state,
                authError: null,
                loggedIn: false
        }

        case "Profile_updated":
            console.log("Profile_updated ");
            return{
                ...state,
                registered: false
        }
        case "Profile_error":
            console.log("Profile_updated ");
            return{
                ...state,
                registered: false
        }

        default:
            return state;


    }
};

export default authReducer;