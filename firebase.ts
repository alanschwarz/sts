import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAiF-k6JBNpAmxx3LOxg4PExvHY6K6HVXY",
    authDomain: "sts-app-8509d.firebaseapp.com",
    databaseURL: "https://sts-app-8509d.firebaseio.com",
    projectId: "sts-app-8509d",
    storageBucket: "sts-app-8509d.appspot.com",
    messagingSenderId: "214446955939",
    appId: "1:214446955939:web:314f7f98157946b6bc0e16"
};

var app;
if (firebase.apps.length < 1) {
    app = firebase.initializeApp(firebaseConfig);
}

export const auth = app.auth()
export default app