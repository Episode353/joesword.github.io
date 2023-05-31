// Your Firebase web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCqgWyZOOfVZddqVjV-ZsDpMo6b0F1UJxs",
    authDomain: "joesworldonline-967be.firebaseapp.com",
    projectId: "joesworldonline-967be",
    storageBucket: "joesworldonline-967be.appspot.com",
    messagingSenderId: "817241549916",
    appId: "1:817241549916:web:787af20d01f9172efaca99"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
var storage = firebase.storage();

// Create a reference to the images folder in Firebase Storage
var imagesRef = storage.ref().child('images');

// Get a reference to the database
var database = firebase.database();