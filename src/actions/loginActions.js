export const loginActions = ( credentials ) => {
  return(dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      // const state = getState;
      // console.log("login action getState: ", state);
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
          dispatch({
              type: "login",
              payload: true
            });
      }).catch((err) => {
          dispatch({
            type: "login_Error",
            payload: false,
            err
          });
      });
  }
};


export const logOut = () => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({type: 'logout', payload: false})
    })

  }
}

// export const createUser = (name, email, password) => {
//   return(dispatch, getState, {getFirebase, getFirestore}) => {
//     const firebase = getFirebase();
//     const database = firebase.database().ref();
//     const userDetailsRef = database.child("user-details");
//     // const userDetailsRef = databaseRef.child("user-details");
//     userDetailsRef.orderByChild('userName').equalTo(name).on("value", function(snapshot){
//       if (snapshot.exists()) {
//           console.log("exists");
//           dispatch({
//               type:"false_register",
//               payload: false
//           })
//       }else{
//          console.log("doesn't exist");
//          firebase.auth().signInAnonymously().then(function(user){
//               userDetailsRef.push().set({
//                   userId: user.user.uid,
//                   userName: name,
//                   passWord: password
//               });
//               dispatch({
//                   type:"register",
//                   payload: true
//               })
//           }).catch(function(error){
//               // Handle Errors here.
//               var errorCode = error.code;
//               // var errorMessage = error.message;
          
//               if (errorCode === 'auth/operation-not-allowed') {
//               alert('You must enable Anonymous auth in the Firebase Console.');
//               } else {
//               console.error(error);
//               }
//           })
//       }
//     });

//   }
// }

export const signUp = ( credentials ) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      // const databaseRef = firebase.database().ref();
      // const userDetailsRef = databaseRef.child("user-details");
      const firestore = getFirestore();
      const state = getState();
      firebase.auth().createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then((user) => {
        return firestore.collection('Profiles').doc(user.user.uid).set({
          FullName: "",
          Email: credentials.email,
          State: "",
          City: "",
          Zipcode: 0,
          MainAddress: "",
          Address2: "", 
          UserName: credentials.username,
          AboutMe: ""
        });
      }).then(() => {
        dispatch({
              type: "signedUp",
              payload: true,
              registered: true
        });
        console.log("Signing up action getState: ", state);          
      }).catch((err) => {
          dispatch({
            type: "signUp_Error",
            payload: false,
            registered: false,
            err
          });
      });
  }
};

// FullName, UserName, Email, State, City, MainAddress, Address2, Zipcode, AboutMe 