// Initialize the wheel with options (Discounts, Free Shipping, etc.)
let wheel = new Winwheel({
    'numSegments': 6,        // 6 segments on the wheel
    'outerRadius': 200,      // Radius of the wheel
    'innerRadius': 40,       // Hollow in the center
    'textFontSize': 16,      // Font size for text
    'textAlignment': 'center', // Text alignment
    'segments': [
        { 'fillStyle': '#FF5733', 'text': '10% OFF' },   // Segment 1
        { 'fillStyle': '#33FF57', 'text': 'Free Shipping' }, // Segment 2
        { 'fillStyle': '#3357FF', 'text': 'Buy 1 Get 1' },  // Segment 3
        { 'fillStyle': '#FF33A5', 'text': '15% OFF' },     // Segment 4
        { 'fillStyle': '#33A5FF', 'text': 'Free Shipping' }, // Segment 5
        { 'fillStyle': '#A533FF', 'text': '20% OFF' },      // Segment 6
    ],
    'animation': {
        'type': 'spinToStop',     // Animation type
        'duration': 5,            // Duration of spin in seconds
        'spins': 8                // Number of spins
    }
});

// Add event listener to the Spin button
document.getElementById('spin-button').addEventListener('click', function () {
    wheel.startAnimation();  // Start the spin animation
});

// This function will show the result of the spin
wheel.animation.callback = function () {
    let resultText = wheel.getIndicatedSegment().text;
    document.getElementById('result').innerHTML = `You won: ${resultText}`;
}
