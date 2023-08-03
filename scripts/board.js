// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = 'black';
let currentBackgroundColor = 'white';
let currentBrushSize = 10;
let currentTool = 'brush';

const undoButton = document.getElementById('undo');
const undoStack = [];
let initialCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
undoStack.push(initialCanvasState);

undoButton.addEventListener('click', () => {
    if (undoStack.length > 1) {
        ctx.putImageData(undoStack.pop(), 0, 0);
    } else if (undoStack.length === 1) {
        ctx.putImageData(undoStack[0], 0, 0);
        undoStack.length = 0;
    }
});



// makes backround white on startup

ctx.fillStyle = currentBackgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// transparent button makes transparant backround

const transparentBackgroundButton = document.getElementById('transparent-background');
transparentBackgroundButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Add the current canvas state to the undo stack

function addToUndoStack() {
    const currentCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (!isEqualImageData(previousCanvasState, currentCanvasState)) {
        undoStack.push(currentCanvasState);
        previousCanvasState = currentCanvasState;
    }
    // remove excess undo steps
    if (undoStack.length > maxUndoSteps) {
        undoStack.shift();
    }
}

function isEqualImageData(imageData1, imageData2) {
    if (imageData1.width !== imageData2.width || imageData1.height !== imageData2.height) {
        return false;
    }
    for (let i = 0; i < imageData1.data.length; i++) {
        if (imageData1.data[i] !== imageData2.data[i]) {
            return false;
        }
    }
    return true;
}

// Add the addToUndoStack function to the mouseup event listener
canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        addToUndoStack();
        isDrawing = false;
    }
});

// Set up the clear page button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Set up the color picker
const colorPicker = document.getElementById('color');
colorPicker.addEventListener('change', (event) => {
    currentColor = event.target.value;
});

// Set up the background color picker
const backgroundColorPicker = document.getElementById('background-color');
backgroundColorPicker.addEventListener('input', (event) => {
    currentBackgroundColor = event.target.value;
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});


// Set up the brush/eraser size slider
const brushSizeSlider = document.getElementById('brush-size');
brushSizeSlider.addEventListener('input', (event) => {
    currentBrushSize = event.target.value;
    console.log(currentBrushSize); // Print the current brush size
});


// Set up the eraser button
const eraserButton = document.getElementById('eraser');
eraserButton.addEventListener('click', () => {
    currentTool = 'eraser';
});

// Set up the brush button
const brushButton = document.getElementById('brush');
brushButton.addEventListener('click', () => {
    currentTool = 'brush';
});

// Set up the canvas size input elements
const canvasWidthInput = document.getElementById('canvas-width');
const canvasHeightInput = document.getElementById('canvas-height');
canvasWidthInput.addEventListener('change', () => {
    canvas.width = canvasWidthInput.value;
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});
canvasHeightInput.addEventListener('change', () => {
    canvas.height = canvasHeightInput.value;
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Add the mouse event listeners
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentTool === 'brush' ? currentColor : currentBackgroundColor;
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
    lastX = x;
    lastY = y;
});

// Move the mouseup and mouseout events to the window object
window.addEventListener('mouseup', () => {
    if (isDrawing) {
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        isDrawing = false;
    }
});

window.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Add touch event listeners for mobile devices
canvas.addEventListener('touchstart', (event) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = event.touches[0].clientX - rect.left;
    lastY = event.touches[0].clientY - rect.top;
});

canvas.addEventListener('touchmove', (event) => {
    if (!isDrawing) return;
    event.preventDefault(); // Prevent scrolling
    const rect = canvas.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentTool === 'brush' ? currentColor : currentBackgroundColor;
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
    lastX = x;
    lastY = y;
});

canvas.addEventListener('touchend', () => {
    if (isDrawing) {
        isDrawing = false;
    }
});

// Prevent scrolling on touch devices
document.body.addEventListener('touchstart', (event) => {
    if (event.target === canvas) {
        event.preventDefault();
    }
}, { passive: false });

document.body.addEventListener('touchend', (event) => {
    if (event.target === canvas) {
        event.preventDefault();
    }
}, { passive: false });

document.body.addEventListener('touchmove', (event) => {
    if (event.target === canvas) {
        event.preventDefault();
    }
}, { passive: false });

// image upload
function saveImage() {
    const canvas = document.getElementById("board");
    const imageData = canvas.toDataURL("image/png");
    const fileName = `image-${Date.now()}.png`;
    const storageRef = ref(storage, `images/${fileName}`);
    uploadBytes(storageRef, imageDataToBlob(imageData)).then((snapshot) => {
        console.log("Image uploaded successfully");
        snapshot.ref.getDownloadURL().then((url) => {
            console.log(`File available at ${url}`);
            displayImage(url);
        });
    });
}

function imageDataToBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
}

function displayGallery() {
    const imagesRef = ref(storage, "images/");
    getStorageItems(imagesRef).then((items) => {
        items.forEach((item) => {
            item.getDownloadURL().then((url) => {
                displayImage(url);
            });
        });
    });
}

async function getStorageItems(ref) {
    const listResult = await listAll(ref);
    const items = await Promise.all(
        listResult.items.map((itemRef) => itemRef.get())
    );
    return items;
} 

const shapeButton = document.getElementById('shape');
const rectangleButton = document.getElementById('rectangle');
const circleButton = document.getElementById('circle');
const triangleButton = document.getElementById('triangle');

let currentShape = '';

shapeButton.addEventListener('click', () => {
    currentTool = 'shape';
    currentShape = '';
});

rectangleButton.addEventListener('click', () => {
    currentShape = 'rectangle';
});

circleButton.addEventListener('click', () => {
    currentShape = 'circle';
});

triangleButton.addEventListener('click', () => {
    currentShape = 'triangle';
});

canvas.addEventListener('mousemove', (event) => {
    if (currentTool === 'shape' && currentShape !== '') {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.fillStyle = currentColor;
        switch (currentShape) {
            case 'rectangle':
                ctx.fillRect(lastX, lastY, x - lastX, y - lastY);
                break;
            case 'circle':
                const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
                ctx.beginPath();
                ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(lastX + (x - lastX) / 2, y);
                ctx.lineTo(x, lastY);
                ctx.closePath();
                ctx.fill();
                break;
        }
    }
});

window.addEventListener('mouseup', () => {
    if (isDrawing) {
        if (currentTool === 'brush') {
            addToUndoStack();
        } else if (currentTool === 'shape') {
            undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
        isDrawing = false;
    }
});


});