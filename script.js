// Get the canvas and context
const canvas = document.getElementById('gameCanvas');

// ctx represents 2D rendering context of the canvas
const ctx = canvas.getContext('2d');

// Log a confirmation message to the console
console.log('Canvas is set up!');

// Basket Properties
const basket = {
    x: canvas.width / 2 - 120, // Center horizontally
    y: canvas.height - 150,   // Position near the bottom
    width: 300,
    height: 150,
    img: new Image(),        // Create an Image object
};

// Load the basket image
basket.img.src = "object-assets/picnic-game-basket/picnic-basket.png";

// Draw the basket image on the canvas once loaded
basket.img.onload = function () {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw the basket image
ctx.drawImage(basket.img, basket.x, basket.y, basket.width, basket.height);

    console.log('Basket image is loaded and drawn!');
};

//Draw the background
