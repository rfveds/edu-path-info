const canvas = document.getElementById('canvas');
const overlayContent = document.getElementById('overlayContent');
const closeButton = document.getElementById('closeButton');

const ctx = canvas.getContext('2d');

const spriteWidth = 3393;
const spriteHeight = 462;

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 462;

const backgroundImage = new Image();
backgroundImage.src = 'assets/formy_arkadowe_punkt_1.png'

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

    ctx.fillStyle = "blue";
    ctx.fillRect(rectangle.x - cameraX, rectangle.y - cameraY, rectangle.width, rectangle.height);
}

// Function to show the overlay content
function showOverlayContent() {
    overlayContent.style.display = 'flex';
}

// Function to close the overlay content
function closeOverlayContent() {
    overlayContent.style.display = 'none';
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

    // Check if the mouse click is within the rectangle
    if (
        mouseX >= rectangle.x &&
        mouseX <= rectangle.x + rectangle.width &&
        mouseY >= rectangle.y &&
        mouseY <= rectangle.y + rectangle.height
    ) {
        showOverlayContent();
    }
});

// Add event listener to the close button
closeButton.addEventListener('click', closeOverlayContent);

// Initial drawing
backgroundImage.onload = () => {
    drawBackground();
};