// Replace the following with your Firebase project configuration
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

// Get a reference to the database
var database = firebase.database();

// Array to store displayed item keys
var displayedItems = [];

// Function to save data to Firebase
function saveData() {
    var text = document.getElementById("sub-text").value;
    var treeRef = database.ref("subbox"); // Replace "subbox" with your desired tree name
    var randomKey = Math.floor(1000000 + Math.random() * 9000000); // Generate seven-digit random number
    var newStringRef = treeRef.child(randomKey);
    newStringRef.set(text);
    document.getElementById("subbox").value = ""; // Clear the textbox
}

// Function to remove data from Firebase
function removeData(key) {
    var treeRef = database.ref("subbox").child(key); // Replace "subbox" with your desired tree name
    treeRef.remove();
    refreshDisplay();
}

// Function to display data from Firebase
function displayData(snapshot) {
    var key = snapshot.key;
    // Check if item is already displayed
    if (displayedItems.includes(key)) {
        return;
    }
    displayedItems.push(key);
    var data = snapshot.val();
    var displayBox = document.getElementById("displayBox");
    displayBox.innerHTML += "<p>" + data + " <button onclick='removeData(" + key + ")'>Delete</button></p>";
    updateCounter(); // Update the counter after displaying new data
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
