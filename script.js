// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
console.log('Canvas is set up!');

// Set canvas size (if not already done in HTML)
canvas.width = 800;  // Adjust based on your desired size
canvas.height = 600; // Adjust based on your desired size

//--------------------//

// Basket Properties
const basket = {
    x: canvas.width / 2 - 100,
    y: canvas.height - 60,
    width: 150,
    height: 50,
    img: new Image(),
    direction: 0,
    speed: 7,
};

// Load the basket image
basket.img.src = "object-assets/picnic-game-basket/picnic-basket.png";

// Score and missed items
let score = 0;
let missedItems = 0;

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    ctx.fillStyle = '#87ceeb'; // Light blue for the sky
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the basket
    ctx.drawImage(basket.img, basket.x, basket.y, basket.width, basket.height);

    // Draw the falling items
    drawItems();

    //Draw the score
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Update the basket's position
function update() {
    basket.x += basket.direction * basket.speed;

    // Prevent the basket from moving off the canvas
    if (basket.x < 0) basket.x = 0;
    if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
}

// Falling items properties
const items = []; // Array to store falling items

const itemImages = {
    bagel: "object-assets/picnic-game-food-assets/bagel.png",
    banana: "object-assets/picnic-game-food-assets/banana.png",
    cake: "object-assets/picnic-game-food-assets/cake.png",
    cookie: "object-assets/picnic-game-food-assets/cookie.png",
    jelly: "object-assets/picnic-game-food-assets/jelly.png",
    pear: "object-assets/picnic-game-food-assets/pear.png",
    strawberry: "object-assets/picnic-game-food-assets/strawberry.png",
};

// Falling item constructor
function FallingItem() {
    const itemTypes = ['bagel', 'banana', 'cake', 'cookie', 'jelly', 'pear', 'strawberry'];
    const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];

    this.x = Math.random() * (canvas.width - 100);  // Random x position
    this.y = 0;  // Start at the top
    this.width = 100;  // Default width
    this.height = 100; // Default height
    this.speed = 2 + Math.random() * 3;  // Random falling speed
    this.type = randomType;
    this.img = new Image();
    this.img.src = itemImages[this.type];  // Set image source for this item

    this.loaded = false;  // Flag to track if the image is loaded

    // Add onload event to ensure image is loaded before drawing
    this.img.onload = () => {
        this.loaded = true; // Mark item as loaded
        console.log(`Item of type ${this.type} loaded.`);
    }
}

// Draw the falling items
function drawItems() {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.loaded) {  // Ensure the image is loaded before drawing
            ctx.drawImage(item.img, item.x, item.y, item.width, item.height);
        } else {
            console.log(`Item of type ${item.type} is not loaded yet.`);
        }
    }
}

// Update falling items' positions
function updateItems() {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.y += item.speed;  // Move the item down

        // Check for collision with the basket
        if (
            item.y + item.height >= basket.y &&
            item.x + item.width > basket.x &&
            item.x < basket.x + basket.width
        ) {
            items.splice(i, 1);  // Remove item if caught
            i--;  // Adjust index after removal
            score++;
            console.log('Item caught! Current score: ' + score);
        }
        // Remove item if it goes past the bottom
        if (item.y > canvas.height) {
            items.splice(i, 1);  // Remove item
            i--;  // Adjust index after removal
            console.log('Item missed! Missed items: ' + missedItems);

            if (missedItems >= 5) {
                alert('Game Over! Your score: ' + score);
                resetGame();
            }
        }
    }
}

// Spawn a new falling item every 2 seconds
setInterval(function() {
    items.push(new FallingItem());  // Add a new item to the array
    console.log('New item spawned!');
}, 2500); // Spawn items every 2.5 seconds

// Game loop
function gameLoop() {
    update();  // Update positions
    updateItems();  // Update falling items
    draw();  // Redraw everything
    requestAnimationFrame(gameLoop);  // Keep the loop running
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
