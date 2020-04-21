import firebase from "firebase/app";
import'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
const Config = {
    apiKey: "AIzaSyAuosx4sjERblWYTk1nWod7bgnVOa9RsjQ",
    authDomain: "fuel-predictor.firebaseapp.com",
    databaseURL: "https://fuel-predictor.firebaseio.com",
    projectId: "fuel-predictor",
    storageBucket: "fuel-predictor.appspot.com",
    messagingSenderId: "647415020588",
    appId: "1:647415020588:web:671c48161defb912a56589",
    measurementId: "G-L99BTP9W34"
};



firebase.initializeApp(Config);
// firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.database().ref();

export default firebase;
