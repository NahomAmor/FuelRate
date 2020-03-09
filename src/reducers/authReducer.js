export default (
    state={},
    action
) => {
    switch (action.type) {
        case "register":
            console.log(
                "register is",
                action.payload
            );
            return {
                ...state,
                loggedIn:
                    action.payload
        }

        case "login":
            console.log(
                "login is ",
                action.payload
            );
            return{
                ...state,
                loggedIn:
                    action.payload
            } 
        default:
            return state;


    }
}