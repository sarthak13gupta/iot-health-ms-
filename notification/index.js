// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'ACc0823b83b8baaaf4ce01a7559197f1e8';
const authToken = 'e8bc6680f3b00bf75f2e3cc178c77f1c';
const client = require('twilio')(accountSid, authToken);


//--------firebase--------/
const firebase = require('firebase');


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBSbuwdEwP_SSOBhdmiiwfJiHQ8NU_wQ0w",
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

    if (temp > 37) {

        for (i = 0; i < arr.length; i++) {

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