﻿// Replace the following with your Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyCqgWyZOOfVZddqVjV-ZsDpMo6b0F1UJxs",
    authDomain: "joesworldonline-967be.firebaseapp.com",
    databaseURL: "https://joesworldonline-967be-default-rtdb.firebaseio.com",
    projectId: "joesworldonline-967be",
    storageBucket: "joesworldonline-967be.appspot.com",
    messagingSenderId: "817241549916",
    appId: "1:817241549916:web:787af20d01f9172efaca99"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
var storage = firebase.storage();

// Get a reference to the database
var database = firebase.database();

const auth = firebase.auth();




//------------------------------------------------------
//
//
//
//          Subbox Code
//
//
//--------------------------------------------------------



// Array to store displayed item keys
var displayedItems = [];

// Function to save data to Firebase
function saveData() {
    var text = document.getElementById("sub-text").value;
    var database = firebase.database();
    var treeRef = database.ref("subbox");
    var randomKey = Math.floor(1000000 + Math.random() * 9000000);
    var newStringRef = treeRef.child(randomKey);
    newStringRef.set(text);
    document.getElementById("sub-text").value = ""; // Clear the textbox
}

// Function to save data to Firebase only if the text box is not empty
function addSubmission() {
    var text = document.getElementById("sub-text").value;
    if (text.trim() !== "") {
        var database = firebase.database();
        var treeRef = database.ref("subbox");
        var randomKey = Math.floor(1000000 + Math.random() * 9000000);
        var newStringRef = treeRef.child(randomKey);
        newStringRef.set(text);
        document.getElementById("sub-text").value = ""; // Clear the textbox
    }
}



/// Function to display data from Firebase
function displayData(snapshot) {
    var key = snapshot.key;
    // Check if item is already displayed
    if (displayedItems.includes(key)) {
        return;
    }
    displayedItems.push(key);
    var data = snapshot.val();
    var displayBox = document.getElementById("displayBox");
    displayBox.innerHTML += "<p>" + data + " <button onclick='removeData(\"" + key + "\")'>x</button></p>";
    updateCounter(); // Update the counter after displaying new data
}

// Function to remove data from Firebase
function removeData(key) {
    var treeRef = database.ref("subbox").child(key); // Replace "subbox" with your desired tree name
    treeRef.remove();
    refreshDisplay();
}


// Function to refresh the display box
function refreshDisplay() {
    displayedItems = []; // Clear the displayed items array
    var displayBox = document.getElementById("displayBox");
    displayBox.innerHTML = ""; // Clear the display box

    // Retrieve data from Firebase and listen for changes
    var treeRef = database.ref("subbox"); // Replace "subbox" with your desired tree name
    treeRef.on("child_added", displayData);

    updateCounter(); // Update the counter initially
}

// Function to update the counter
function updateCounter() {
    var treeRef = database.ref("subbox"); // Replace "subbox" with your desired tree name
    treeRef.once("value")
        .then(function (snapshot) {
            var count = snapshot.numChildren();
            var counterElement = document.getElementById("counter");
            counterElement.textContent = count;
        });
}

// Refresh the display box initially
window.addEventListener("DOMContentLoaded", refreshDisplay);



//-------------------------------
//
//
//          Gallery Code
//
//
//---------------------------------







// Create a reference to the images folder in Firebase Storage
var imagesRef = storage.ref().child('images');

// Get the download URLs of all images in the images folder
imagesRef.listAll().then(function (result) {
    // Get a random image URL from the list of URLs
    var randomIndex = Math.floor(Math.random() * result.items.length);
    var randomImageRef = result.items[randomIndex];

    // Get the download URL for the random image
    randomImageRef.getDownloadURL().then(function (url) {
        // Create an img element with the download URL as the src attribute
        var img = document.createElement('img');
        img.src = url;
        // Add the img element to the gallery div
        document.querySelector('.gallery').appendChild(img);
    });
}).catch(function (error) {
    console.log(error);
});

//---------------------------------
//
//
//       authorization
//--------------------------
document.addEventListener('DOMContentLoaded', () => {
const accountBtn = document.getElementById('accountBtn');
const dropdownContent = document.getElementById('dropdownContent');
const userDisplay = document.getElementById('userDisplay');
const logoutBtn = document.getElementById('logoutBtn');



auth.onAuthStateChanged(user => {
    const accountBtn = document.getElementById('accountBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    const userDisplay = document.getElementById('userDisplay');
    const loginStatus = document.getElementById('loginStatus');
    const loginStatusText = document.getElementById('loginStatusText');
    const logoutBtn = document.getElementById('logoutBtn'); // Get the logout button element

    if (user) {
        accountBtn.style.display = 'none';
        dropdownContent.style.display = 'block';
        userDisplay.textContent = `Logged in as: ${user.email}`;
        loginStatus.style.display = 'flex';
        loginStatusText.textContent = `Logged in as: ${user.email}`;
        logoutBtn.style.display = 'block'; // Display the logout button when user is logged in
    } else {
        accountBtn.style.display = 'block';
        dropdownContent.style.display = 'none';
        userDisplay.textContent = '';
        loginStatus.style.display = 'none';
        logoutBtn.style.display = 'none'; // Hide the logout button when user is logged out
    }
});

const loginFormContainer = document.getElementById('loginFormContainer');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginStatus = document.getElementById('loginStatus');
const loginStatusText = document.getElementById('loginStatusText');

accountBtn.addEventListener('click', () => {
    loginFormContainer.style.display = 'block';
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        loginFormContainer.style.display = 'none';
        loginStatus.style.display = 'flex';
        loginStatusText.textContent = `Logged in as: ${email}`;
        loginStatusText.style.color = 'green';
    } catch (error) {
        console.error(error.message);
        loginStatus.style.display = 'flex';
        loginStatusText.textContent = 'Login unsuccessful. Please try again.';
        loginStatusText.style.color = 'red';
    }
});

logoutBtn.addEventListener('click', () => {
    auth.signOut();
    loginStatus.style.display = 'none';
});

//All code before this "});" will not be excecuted until the page is fully loaded
});



//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//
//
//
//
//
//
//
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=