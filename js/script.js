const canvas = document.getElementById('canvas');
const overlayContent1 = document.getElementById('overlayContent1');
const overlayContent2 = document.getElementById('overlayContent2');
const closeButton1 = document.getElementById('closeButton1');
const closeButton2 = document.getElementById('closeButton2');

const ctx = canvas.getContext('2d');

const spriteWidth = 3393;
const spriteHeight = 462;

const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = 462;

const backgroundImage = new Image();
backgroundImage.src = 'assets/formy_arkadowe_punkt_1.png'

const magnifierImage1 = new Image();
magnifierImage1.src = 'assets/magnifier.png'

const magnifierImage2 = new Image();
magnifierImage2.src = 'assets/magnifier.png'

// Create a rectangle object
const rectangle = {
    x: 0,
    y: 100,
    width: 100,
    height: 50,
};

// Define the camera position and size
let cameraX = 0;
let cameraY = 0;
const cameraWidth = canvas.width;
const cameraHeight = canvas.height;

// Function to update the camera position (e.g., based on user input)
function updateCameraPosition(newX, newY) {
    cameraX = newX;
    cameraY = newY;
}

// Function to draw the background image based on the camera position
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(
        backgroundImage, // Image to draw
        cameraX, 0, cameraWidth, cameraHeight, // Source image cropping
        0, 0, canvas.width, canvas.height // Destination on the canvas
    );

    ctx.drawImage(
        magnifierImage1, // Image to draw
        0 - cameraX + 2370,
        0 - cameraY + 200,
        magnifierImage1.width * 0.5,
        magnifierImage1.height * 0.5
    );

    ctx.drawImage(
        magnifierImage2, // Image to draw
        0 - cameraX + 2550,
        0 - cameraY + 260,
        magnifierImage2.width * 0.5,
        magnifierImage2.height * 0.5
    );
}

// Function to show the overlay content
function showOverlayContent1() {
    overlayContent1.style.display = 'flex';
}

function showOverlayContent2() {
    overlayContent2.style.display = 'flex';
}

// Function to close the overlay content
function closeOverlayContent() {
    overlayContent1.style.display = 'none';
    overlayContent2.style.display = 'none';
}

// Event listener for key press
document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowRight' && cameraX < spriteWidth - cameraWidth) {
        console.log(cameraX)
        updateCameraPosition(cameraX + 10, cameraY);
    }
    if (event.key === 'ArrowLeft' && cameraX > 0) {
        console.log(cameraX)
        updateCameraPosition(cameraX - 10, cameraY);
    }

    drawBackground(); // Redraw the background image based on the updated camera position
});


// Variables to store the initial mouse position
let initialMouseX = 0;
let initialMouseY = 0;
let isMouseDown = false; // Flag to indicate if the mouse button is pressed

// Event listener for mouse down event
document.addEventListener('mousedown', (event) => {
    // Store the initial mouse position
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
    isMouseDown = true;
});

// Event listener for mouse move event
document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        // Calculate the distance moved by the mouse
        const deltaX = event.clientX - initialMouseX;
        const deltaY = event.clientY - initialMouseY;

        // Update the camera position based on the mouse movement
        const newCameraX = cameraX - deltaX;
        const newCameraY = cameraY - deltaY;

        // Make sure the camera position is within the valid range
        if (newCameraX >= 0 && newCameraX <= spriteWidth - cameraWidth) {
            cameraX = newCameraX;
        }
        if (newCameraY >= 0 && newCameraY <= spriteHeight - cameraHeight) {
            cameraY = newCameraY;
        }

        drawBackground(); // Redraw the background image based on the updated camera position

        // Update the initial mouse position for the next movement calculation
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
    }
});

// Event listener for mouse up event
document.addEventListener('mouseup', (event) => {
    isMouseDown = false;
});



// Event listener for mouse click
canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the mouse click is within the first magnifier
    if (
        mouseX >= 0 - cameraX + 2370 &&
        mouseX <= 0 - cameraX + 2370 + magnifierImage1.width &&
        mouseY >= 0 - cameraY + 200 &&
        mouseY <= 0 - cameraY + 200 + magnifierImage1.height
    ) {
        showOverlayContent1();
        magnifierImage1.src = 'assets/magnifier_active.png'
        drawBackground()

    }

    // Check if the mouse click is within the second magnifier
    if (
        mouseX >= 0 - cameraX + 2550 &&
        mouseX <= 0 - cameraX + 2550 + magnifierImage2.width &&
        mouseY >= 0 - cameraY + 260 &&
        mouseY <= 0 - cameraY + 260 + magnifierImage2.height
    ) {
        showOverlayContent2();
        magnifierImage2.src = 'assets/magnifier_active.png'
        drawBackground()
    }
});

// Add event listener to the close button
closeButton1.addEventListener('click', () => {
        closeOverlayContent();
        magnifierImage1.src = 'assets/magnifier.png'
        magnifierImage2.src = 'assets/magnifier.png'
        drawBackground()
});

closeButton2.addEventListener('click', () => {
    closeOverlayContent();
    magnifierImage1.src = 'assets/magnifier.png'
    magnifierImage2.src = 'assets/magnifier.png'
    drawBackground()
});

// Initial drawing
backgroundImage.onload = () => {
    drawBackground();
};