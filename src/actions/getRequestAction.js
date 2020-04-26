import moment from "moment";
var Current = 1.5;


export const getRequestAction = ( request ) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        var margin = 0;
        console.log("Get Request Action :");
        const uid = getState().firebase.auth.uid;
        const loc = (getState().firebase.profile.State === 'TX' ? 0.02: 0.04 );
        console.log(" State :", getState().firebase.profile.State , loc );
        const req = (request.Gallons >= 1000 ? 0.02 :0.03);
        const hist = (firestore.collection('Requests').doc(uid).get() !== {} ? 1 : 0);
        console.log(" history :", getState().firestore.ordered.Requests.find(function(value, index, array){ return value[uid]; }) , hist );
        const summ = (moment(request.date).format("MMMM")==="June" || moment(request.date).format("MMMM")==="July"  || moment(request.date).format("MMMM")==="August" ? 0.04 : 0.03);
        console.log(" date :", moment(request.date).format("MMMM") , summ );
        margin = Current * (loc - hist +req + 0.1 + summ);
        const suggested = Current + margin;
        const due = request.Gallons * suggested;
        // suggested = suggested.toFixed(2);
        // due = due.toFixed(2)
        var formula = ("Formula: "+(1.5)+ " * ( "+ (loc)+ " - "+ (hist)+ " + "+ (req)+ " + " +(0.1)+(summ)+ ")") 
        console.log("Formula: ", 1.5, " * ( " , loc, " - ", hist, " + ", req, " + ", 0.1, summ, ")", formula)
        console.log(" Margin, Suggested, Current :", margin.toFixed(2), ' ' , suggested,' ' , due.toFixed(2));
        dispatch({
            type: "getRequest",
            payload: true,
            request,
            suggested,
            due,
            formula
        })

    }


};
// export const RequestQuotes = (info) => {
//     return(dispatch, getState, {getFirestore}) => {
//         const firestore = getFirestore();
//         // const profile = getState().firebase.profile;
//         const userid = getState().firebase.auth.uid;
//         firestore.collection('Requests').doc(userid).collection("RequestHistory").get()({
//           ...info
//         }).then(() => {
//             dispatch({
//                 type: "Profile_updated",
//                 payload: true
//               });
//         }).catch((err) => {
//             dispatch({
//               type: "Profile_error",
//               payload: err,
//               err
//             });
//         });
//     }
//   };