require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//console.log('###')
//--------firebase--------/
const firebase = require('firebase');
//const { LogList } = require('twilio/lib/rest/serverless/v1/service/environment/log');


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "sg-project-trial.firebaseapp.com",
    databaseURL: "https://sg-project-trial-default-rtdb.firebaseio.com",
    projectId: "sg-project-trial",
    storageBucket: "sg-project-trial.appspot.com",
    messagingSenderId: "319429089870",
    appId: "1:319429089870:web:afb35693173a866a2e011f",
    measurementId: "G-R1Z1P5G3DE"
};

var temp;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var arr = ['+917651816317 ', '+917376497817'];

var readref = firebase.database().ref('object');
readref.on('value', (snapshot) => {
    temp = snapshot.val().temperature;
    //console.log('@@@');
    if (temp > 37) {
        //console.log(temp);
        for (i = 0; i < arr.length; i++) {
            //console.log(i);
            client.messages
                .create({

                    body: `patient temperature is ${temp}`,
                    from: '+13602051818',
                    to: arr[i],


                })
                .then(message => console.log(message.sid, ' notif send'));
        }
    } else {
        console.log('no notif');
    }
});