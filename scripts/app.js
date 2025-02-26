// Define the prize options (with color and prize name)
var prizeSegments = [
    { label: "10% Discount", color: '#ff6666' },
    { label: "Free Shipping", color: '#66b3ff' },
    { label: "Buy One Get One Free", color: '#99ff99' },
    { label: "20% Seasonal Discount", color: '#ffcc66' },
    { label: "10% Discount", color: '#ff6666' },
    { label: "Free Shipping", color: '#66b3ff' },
];

// Initialize Spin.js wheel options
var opts = {
    lines: 12, // Number of sections on the wheel
    length: 20, // Length of each segment
    width: 30, // Thickness of each segment
    radius: 150, // Radius of the wheel
    scale: 1, // Scale of the wheel
    corners: 1, // Corner radius
    color: '#f7f7f7', // Default segment color
    opacity: 0.75, // Opacity of segments
    rotate: 0, // Starting angle
    direction: 1, // Rotation direction
    speed: 1, // Speed of spin
    animationDuration: 2, // Duration of animation
    animationType: 'spin', // Spin animation
    pinning: true, // Pin the wheel to the position
    pins: 12, // Number of pins on the wheel
    pinColor: '#000', // Color of the pins
    drawText: true, // Enable text in segments
    fontSize: 16, // Font size for segment labels
    textColor: '#fff', // Text color in segments
    segments: prizeSegments.map(function (segment) {
        return {
            fillStyle: segment.color,
            text: segment.label,
        };
    }),
};

// Create the spinner
var spinner = new Spin(opts).spin(document.getElementById('wheel'));

// Button functionality to start the spin
var spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', function () {
    spinner.spin(document.getElementById('wheel'));

    // Simulate the wheel spinning and stopping
    setTimeout(function () {
        spinner.stop();

        // Get the result
        var selectedSegment = prizeSegments[Math.floor(Math.random() * prizeSegments.length)];

        // Show the result in the 'result' div
        document.getElementById('result').innerText = "You won: " + selectedSegment.label;
    }, 3000); // Stop after 3 seconds
});
