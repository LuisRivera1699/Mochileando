import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
    // Usar en desarrolo 
    /*apiKey: "AIzaSyBa-ZyC9Ozz-7RBAtYqsiM3SMwOutEFYKg",
    authDomain: "mochileando-a2f0a.firebaseapp.com",
    databaseURL: "https://mochileando-a2f0a.firebaseio.com",
    projectId: "mochileando-a2f0a",
    storageBucket: "mochileando-a2f0a.appspot.com",
    messagingSenderId: "587669761445",
    appId: "1:587669761445:web:fb69790e00f06ece570c4c",
    measurementId: "G-8NCJMV1K65"*/
    // Usar en produccion
    apiKey: "AIzaSyB0wYIVHr6bgRt7atv2x1EfIaA4J00KZvU",
    authDomain: "mochileando-621d2.firebaseapp.com",
    databaseURL: "https://mochileando-621d2.firebaseio.com",
    projectId: "mochileando-621d2",
    storageBucket: "mochileando-621d2.appspot.com",
    messagingSenderId: "55707952687",
    appId: "1:55707952687:web:4269ff03217e23e9e948da",
    measurementId: "G-N8R5VQG11Z",
});

export { app };
