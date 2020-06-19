import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyBa-ZyC9Ozz-7RBAtYqsiM3SMwOutEFYKg",
        authDomain: "mochileando-a2f0a.firebaseapp.com",
        databaseURL: "https://mochileando-a2f0a.firebaseio.com",
        projectId: "mochileando-a2f0a",
        storageBucket: "mochileando-a2f0a.appspot.com",
        messagingSenderId: "587669761445",
        appId: "1:587669761445:web:fb69790e00f06ece570c4c",
        measurementId: "G-8NCJMV1K65"
    }
);

export {app}