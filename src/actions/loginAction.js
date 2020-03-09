import firebase from "firebaseConfig";


const loginAction = (
    email,
    password
) => async dispatch => {
    //not connected to database
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user){
      dispatch({
          type: "login",
          payload: true
        })    
    })
    .catch(function(error){
      alert(error)})
}

export default loginAction;