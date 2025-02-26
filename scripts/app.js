// Define the options for the Spin.js spinner
var opts = {
    lines: 12, // Number of lines
    length: 0, // Length of each line
    width: 10, // Line thickness
    radius: 30, // Radius of the spinner
    scale: 1, // Scale of the spinner
    corners: 1, // Rounding of corners
    color: '#ff6600', // Spinner color
    fadeColor: 'transparent', // Fade color of the spinner
    animation: 'spin', // Spinner animation style
    speed: 1, // Spinner speed
    rotate: 0, // Rotation angle of the spinner
    animationDuration: 2, // Animation duration
    direction: 1, // Clockwise or counterclockwise direction
    zIndex: 2e9, // z-index of the spinner
    top: '50%', // Positioning
    left: '50%', // Positioning
};

// Create a spinner instance
var spinner = new Spinner(opts);

// Get the container element
var wheelContainer = document.getElementById('wheel');

// Button to start the spin
var spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', function () {
    spinner.spin(wheelContainer);

    // Simulate the wheel spinning and stopping
    setTimeout(function () {
        spinner.stop();
        // Random result generation after the spin stops
        var resultMessages = [
            'You won a 10% Discount!',
            'You won Free Shipping!',
            'You won Buy One Get One Free!',
            'You won a 20% Seasonal Discount!',
        ];
        var randomResult = resultMessages[Math.floor(Math.random() * resultMessages.length)];
        document.getElementById('result').innerText = randomResult;
    }, 3000); // Stop after 3 seconds
});
