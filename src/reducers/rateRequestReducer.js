export default (
    state={},
    action
) => {
    switch (action.type) {
        case "addRateRequest":
            console.log(
                "adding",
                action.payload
            );
            return state;

        case "getRateRequest":
            console.log(
                "getting ",
                action.payload
            );
            return{
                ...state,
                rateRequestState:
                Object.values(
                    action.payload
                )
            } 
        default:
            return state


    }
}