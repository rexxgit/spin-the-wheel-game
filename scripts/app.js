// Set up the Wheel with the prizes
const wheel = new Winwheel({
    'numSegments': 6, // Number of segments on the wheel
    'outerRadius': 200, // Radius of the wheel
    'innerRadius': 60, // Inner radius (for hollow middle part)
    'textFontSize': 16, // Font size for the text
    'textOrientation': 'curved', // Curved text
    'textAlignment': 'center', // Center-align text
    'segments': [
        {'fillStyle': '#ffcc00', 'text': '10% Off'},       // Discount 1
        {'fillStyle': '#ff6666', 'text': '20% Off'},       // Discount 2
        {'fillStyle': '#66cc66', 'text': 'Free Shipping'}, // Free Shipping
        {'fillStyle': '#ffccff', 'text': 'BOGO Offer'},    // Buy One Get One
        {'fillStyle': '#ccffcc', 'text': 'Summer Sale'},   // Seasonal Discount 1
        {'fillStyle': '#ccccff', 'text': 'Winter Sale'}    // Seasonal Discount 2
    ],
    'animation': {
        'type': 'spinToStop',
        'duration': 5, // How long the spin lasts
        'spins': 8, // Number of full spins
        'callbackFinished': function() {
            displayResult(wheel);
        }
    }
});

// Add event listener to the spin button
document.getElementById('spin-button').addEventListener('click', function() {
    wheel.startAnimation();
});

// Display the result of the spin
function displayResult(wheel) {
    const resultText = document.getElementById('result');
    const winningSegment = wheel.getIndicatedSegment();
    resultText.innerHTML = `You win: <strong>${winningSegment.text}</strong>`;
}
