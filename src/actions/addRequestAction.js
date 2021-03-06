

// const firebase = require("nativescript-plugin-firebase/app"); 



export const addRequestAction = ( request ) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userid = getState().firebase.auth.uid;
        // const username= firestore.collection('Requests').doc(userid)
        firestore.collection('Requests').doc(userid).set({
            ...request,
            createdAt: new Date()
        }).then(() => {
            dispatch({
                type: "addRequest",
                payload: true,
                request
            });

        }).catch((err) => {
            dispatch({
                type: "addRequest_Error",
                payload: false,
                err
            });
        })
        

    }
};
