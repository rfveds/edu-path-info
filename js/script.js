const canvas = document.getElementById('canvas');
const overlayContent1 = document.getElementById('overlayContent1');
const overlayContent2 = document.getElementById('overlayContent2');
const overlayContent3 = document.getElementById('overlayContent3');
const overlayContent4 = document.getElementById('overlayContent4');
const closeButton1 = document.getElementById('closeButton1');
const closeButton2 = document.getElementById('closeButton2');
const closeButton3 = document.getElementById('closeButton3');
const closeButton4 = document.getElementById('closeButton4');
const schemaButton = document.getElementById('schema');
const schemaImg = document.getElementById('schemaImg');

const ctx = canvas.getContext('2d');

const spriteWidth = 3393;
const spriteHeight = 462;

const CANVAS_WIDTH = canvas.width = window.innerWidth - 20;
const CANVAS_HEIGHT = canvas.height = 462;

const backgroundImage1 = new Image();
backgroundImage1.src = 'assets/punkt_1.png'

const backgroundImage2 = new Image();
backgroundImage2.src = 'assets/punkt_2.png'

let backgroundImage = backgroundImage2

const magnifierImage1 = new Image();
magnifierImage1.src = 'assets/magnifier.png'

const magnifierImage2 = new Image();
magnifierImage2.src = 'assets/magnifier.png'

const magnifierImage3 = new Image();
magnifierImage3.src = 'assets/magnifier.png'

const magnifierImage4 = new Image();
magnifierImage4.src = 'assets/magnifier.png'

const schemaImage = new Image();
schemaImage.src = 'assets/schemat.png'

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
function drawBackground(backgroundImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(
        backgroundImage, // Image to draw
        cameraX, 0, cameraWidth, cameraHeight, // Source image cropping
        0, 0, canvas.width, canvas.height // Destination on the canvas
    );

    if (backgroundImage === backgroundImage1) {
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

    if (backgroundImage === backgroundImage2) {
        ctx.drawImage(
            magnifierImage3, // Image to draw
            0 - cameraX + 1925,
            0 - cameraY + 125,
            magnifierImage3.width * 0.5,
            magnifierImage3.height * 0.5
        );

        ctx.drawImage(
            magnifierImage4, // Image to draw
            0 - cameraX + 1975,
            0 - cameraY + 225,
            magnifierImage4.width * 0.5,
            magnifierImage4.height * 0.5
        );
    }
}


// Function to show the overlay content
function showOverlayContent(n) {
    const contentId = 'overlayContent' + n;
    const content = document.getElementById(contentId);
    content.style.display = 'flex';
    drawBackground(backgroundImage);
}

// Function to close the overlay content
function closeOverlayContent1() {
    overlayContent1.style.display = 'none';
    overlayContent2.style.display = 'none';
    overlayContent3.style.display = 'none';
    overlayContent4.style.display = 'none';
}
function closeOverlayContent2() {
    overlayContent1.style.display = 'none';
    overlayContent2.style.display = 'none';
    overlayContent3.style.display = 'none';
    overlayContent4.style.display = 'none';
}

function closeOverlayContent3() {
    overlayContent3.style.display = 'none';
    overlayContent4.style.display = 'none';
    overlayContent1.style.display = 'none';
    overlayContent2.style.display = 'none';
}
function closeOverlayContent4() {
    overlayContent4.style.display = 'none';
    overlayContent3.style.display = 'none';
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

    drawBackground(backgroundImage); // Redraw the background image based on the updated camera position
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

        drawBackground(backgroundImage); // Redraw the background image based on the updated camera position

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

    if (backgroundImage === backgroundImage1) {

        // Check if the mouse click is within the first magnifier
        if (
            mouseX >= 0 - cameraX + 2370 &&
            mouseX <= 0 - cameraX + 2370 + magnifierImage1.width &&
            mouseY >= 0 - cameraY + 200 &&
            mouseY <= 0 - cameraY + 200 + magnifierImage1.height
        ) {
            if (overlayContent2.style.display === 'flex' || overlayContent3.style.display === 'flex' || overlayContent4.style.display === 'flex') {
                closeOverlayContent2();
                closeOverlayContent3();
                closeOverlayContent4();
                magnifierImage2.src = 'assets/magnifier.png'
            }
            showOverlayContent('1');
            magnifierImage1.src = 'assets/magnifier_active.png'
            magnifierImage2.src = 'assets/magnifier.png'
            drawBackground(backgroundImage)
        }

        // Check if the mouse click is within the second magnifier
        if (
            mouseX >= 0 - cameraX + 2550 &&
            mouseX <= 0 - cameraX + 2550 + magnifierImage2.width &&
            mouseY >= 0 - cameraY + 260 &&
            mouseY <= 0 - cameraY + 260 + magnifierImage2.height
        ) {
            if (overlayContent1.style.display === 'flex' || overlayContent3.style.display === 'flex' || overlayContent4.style.display === 'flex') {
                closeOverlayContent1();
                closeOverlayContent3();
                closeOverlayContent4();
                magnifierImage1.src = 'assets/magnifier.png'
            }
            showOverlayContent('2');
            magnifierImage2.src = 'assets/magnifier_active.png'
            drawBackground(backgroundImage)
        }
    }

    if(backgroundImage === backgroundImage2) {
        // Check if the mouse click is within the third magnifier
        if (
            mouseX >= 0 - cameraX + 1925 &&
            mouseX <= 0 - cameraX + 1925 + magnifierImage3.width &&
            mouseY >= 0 - cameraY + 125 &&
            mouseY <= 0 - cameraY + 125 + magnifierImage3.height
        ) {
            if (overlayContent2.style.display === 'flex' || overlayContent1.style.display === 'flex' || overlayContent4.style.display === 'flex') {
                closeOverlayContent2();
                closeOverlayContent1();
                closeOverlayContent4();
                magnifierImage4.src = 'assets/magnifier.png'
            }
            showOverlayContent('3');
            magnifierImage3.src = 'assets/magnifier_active.png'
            magnifierImage4.src = 'assets/magnifier.png'
            drawBackground(backgroundImage)
        }

        // Check if the mouse click is within the fourth magnifier
        if (
            mouseX >= 0 - cameraX + 1975 &&
            mouseX <= 0 - cameraX + 1975 + magnifierImage4.width &&
            mouseY >= 0 - cameraY + 225 &&
            mouseY <= 0 - cameraY + 225 + magnifierImage4.height
        ) {
            if (overlayContent1.style.display === 'flex' || overlayContent2.style.display === 'flex' || overlayContent3.style.display === 'flex') {
                closeOverlayContent1();
                closeOverlayContent2();
                closeOverlayContent3();
                magnifierImage3.src = 'assets/magnifier.png'
            }
            showOverlayContent('4');
            magnifierImage4.src = 'assets/magnifier_active.png'
            drawBackground(backgroundImage)
        }
    }

});

// Add event listener to the close button
closeButton1.addEventListener('click', () => {
        closeOverlayContent1();
        magnifierImage1.src = 'assets/magnifier.png'
        magnifierImage2.src = 'assets/magnifier.png'
        drawBackground(backgroundImage)
});

closeButton2.addEventListener('click', () => {
    closeOverlayContent2();
    magnifierImage1.src = 'assets/magnifier.png'
    magnifierImage2.src = 'assets/magnifier.png'
    drawBackground(backgroundImage)
});

closeButton3.addEventListener('click', () => {
    closeOverlayContent3();
    magnifierImage3.src = 'assets/magnifier.png'
    magnifierImage4.src = 'assets/magnifier.png'
    drawBackground(backgroundImage)
});

closeButton4.addEventListener('click', () => {
    closeOverlayContent4();
    magnifierImage3.src = 'assets/magnifier.png'
    magnifierImage4.src = 'assets/magnifier.png'
    drawBackground(backgroundImage)
});

// schemaButton.addEventListener('click', () => {
//     // if (backgroundImage === backgroundImage1) {
//     //     backgroundImage = backgroundImage2;
//     //     drawBackground(backgroundImage)
//     // } else {
//     //     backgroundImage = backgroundImage1;
//     //     drawBackground(backgroundImage)
//     // }
//
//     // magnify the image when the schema button is clicked
//     schemaButton.classList.toggle('active');
//     console.log(schemaButton.classList)
// });

// Initial drawing
backgroundImage1.onload = () => {
    drawBackground(backgroundImage);
};