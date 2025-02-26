// Create the wheel with added visual effects
var theWheel = new Winwheel({
    'numSegments': 6, // Number of segments
    'outerRadius': 200, // Size of wheel
    'innerRadius': 50, // Make the wheel inner radius smaller
    'textFontSize': 24, // Larger text
    'textAlignment': 'center', // Centered text
    'textFillStyle': 'white',
    'segments': [
        {'fillStyle': '#FF5733', 'text': '10% OFF Shoes!'},
        {'fillStyle': '#33FF57', 'text': '20% OFF Shoes!'},
        {'fillStyle': '#3357FF', 'text': 'Free Shipping!'},
        {'fillStyle': '#FF33A8', 'text': 'Free Socks with Purchase!'},
        {'fillStyle': '#FFD700', 'text': 'Buy 1, Get 1 Free!'},
        {'fillStyle': '#00BFFF', 'text': 'Coupon Code: WINBIG'}
    ],
    'animation': {
        'type': 'spinToStop',
        'duration': 6,
        'spins': 8,
        'callbackAfter': function() {
            // Display result once wheel stops
            displayResult();
        }
    }
});

// Handle the spin button click
document.getElementById('spin-button').addEventListener('click', function() {
    // Disable the button during the spin
    document.getElementById('spin-button').disabled = true;
    theWheel.startAnimation();
});

// Display the prize after the spin
function displayResult() {
    // Enable the spin button after the spin
    document.getElementById('spin-button').disabled = false;

    // Get the winning segment
    var winningSegment = theWheel.getIndicatedSegment();
    document.getElementById('result').innerText = `You won: ${winningSegment.text}`;

    // Optional: Add some animations for the result
    document.getElementById('result').style.color = "#FF007F";
    document.getElementById('result').style.fontSize = "24px";
    document.getElementById('result').style.transition = "color 0.3s ease, font-size 0.3s ease";
}
