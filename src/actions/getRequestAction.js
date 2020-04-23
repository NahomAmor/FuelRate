



export const getRequestAction = ( request ) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('')
        dispatch({
            type: "getRequest",
            payload: true,
            request
        })

    }


};

// export default getRequestAction;