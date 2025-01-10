// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
// ctx represents 2D rendering context of the canvas
const ctx = canvas.getContext('2d');
// Log a confirmation message to the console
console.log('Canvas is set up!');

//--------------------//

// Basket Properties
const basket = {
    x: canvas.width / 2 - 100, // Center horizontally
    y: canvas.height - 100,   // Position near the bottom
    width: 200,
    height: 100,
    img: new Image(),         // Create an Image object
    direction: 0,             // Initial direction (stationary)
    speed: 7,                 // Movement speed
};

// Load the basket image
basket.img.src = "object-assets/picnic-game-basket/picnic-basket.png";

// Draw everything
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw the background
    ctx.fillStyle = '#87ceeb'; // Light blue for the sky
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the basket
    ctx.drawImage(basket.img, basket.x, basket.y, basket.width, basket.height);
}

// Update the basket's position
function update() {
    // Move the basket based on its direction
    basket.x += basket.direction * basket.speed;

    // Prevent the basket from moving off the canvas
    if (basket.x < 0) basket.x = 0;
    if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
}

// Game loop
function gameLoop() {
    update(); // Update positions
    draw();   // Redraw everything
    requestAnimationFrame(gameLoop); // Keep the loop running
}

// Handle keydown event
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        basket.direction = -1; // Move left
    } else if (e.key === 'ArrowRight') {
        basket.direction = 1; // Move right
    }
});


// Handle keyup event
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        basket.direction = 0; // Stop moving
    }
});

// Start the game loop once the basket image is loaded
basket.img.onload = function () {
    gameLoop();
};