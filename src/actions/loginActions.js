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