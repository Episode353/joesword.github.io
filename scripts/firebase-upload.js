
                    // Import the functions you need from the SDKs you need
    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
    import {getStorage, ref, uploadBytes} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCqgWyZOOfVZddqVjV-ZsDpMo6b0F1UJxs",
    authDomain: "joesworldonline-967be.firebaseapp.com",
    projectId: "joesworldonline-967be",
    storageBucket: "joesworldonline-967be.appspot.com",
    messagingSenderId: "817241549916",
    appId: "1:817241549916:web:787af20d01f9172efaca99"
                    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Storage
    const storage = getStorage(app);

    const canvas = document.getElementById("canvas");
    const clearButton = document.getElementById("clear");
    const saveButton = document.getElementById("save");
    const gallery = document.getElementById("gallery");

    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
        isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
                    }

    function stopDrawing() {
        isDrawing = false;
                    }

    function draw(e) {
                        if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
                    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }

    function displayImage(url) {
                        const img = document.createElement("img");
    img.src = url;
    img.width = 200;
    gallery.appendChild(img);
                    }

    function saveImage() {
                        const file = canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");
    const storageRef = ref(storage, `images/${Date.now()}.png`);
                        uploadBytes(storageRef, new Uint8Array(atob(file).split("").map(c => c.charCodeAt(0)))).then((snapshot) => {
        console.log("Image uploaded successfully");
                            snapshot.ref.getDownloadURL().then((url) => {
        console.log(`File available at ${url}`);
    displayImage(url);
                            });
                        });
                    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

    clearButton.addEventListener("click", clearCanvas);
    saveButton.addEventListener("click", saveImage);
