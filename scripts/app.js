document.addEventListener('DOMContentLoaded', function () {
    const wheel = new Winwheel({
        'numSegments': 6, 
        'outerRadius': 200, 
        'innerRadius': 60, 
        'textFontSize': 16, 
        'textOrientation': 'curved', 
        'textAlignment': 'center', 
        'segments': [
            {'fillStyle': '#ffcc00', 'text': '10% Off'},
            {'fillStyle': '#ff6666', 'text': '20% Off'},
            {'fillStyle': '#66cc66', 'text': 'Free Shipping'},
            {'fillStyle': '#ffccff', 'text': 'BOGO Offer'},
            {'fillStyle': '#ccffcc', 'text': 'Summer Sale'},
            {'fillStyle': '#ccccff', 'text': 'Winter Sale'}
        ],
        'animation': {
            'type': 'spinToStop',
            'duration': 5,
            'spins': 8,
            'callbackFinished': function() {
                displayResult(wheel);
            }
        }
    });

    // Log button interaction to check if the button is functioning
    document.getElementById('spin-button').addEventListener('click', function() {
        console.log('Spin button clicked!');
        wheel.startAnimation();
    });

    // Display the result of the wheel spin
    function displayResult(wheel) {
        const resultText = document.getElementById('result');
        const winningSegment = wheel.getIndicatedSegment();
        resultText.innerHTML = `You win: <strong>${winningSegment.text}</strong>`;
    }
});
