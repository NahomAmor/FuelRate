const functions = require('firebase-functions');
const admin = require('firebase-admin');

var countrycitystatejson = require('countrycitystatejson');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    
 response.send("Hello from Firebase!", countrycitystatejson.getStatesByShort('US'));
});
const createRequestHistory = (requestHistory => {
    return admin.firestore().collection('RequestHist')
    .add(requestHistory)
    .then(doc => console.log('request added to history', doc));
})

exports.priceModulize = functions.firestore.document('Requests/{requestId}').onCreate(
    doc => {
        const request = doc.data();
        const requestHistory = {
            date: request.date,
            Gallons: request.Gallons,
            Address: request.Address,
            SuggestedPrice: request.SuggestedPrice,
            TotalDue: request.TotalDue,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createRequestHistory(requestHistory);
    }
)
