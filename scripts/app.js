const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const resultDiv = document.getElementById("result");

// Wheel sections
const prizes = [
    { text: "10% OFF", color: "#ff4d4d" },
    { text: "Free Shipping", color: "#4da6ff" },
    { text: "Buy 1 Get 1", color: "#4dff4d" },
    { text: "Seasonal Discount", color: "#ffcc00" }
];

const numSegments = prizes.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentAngle = 0;
let spinning = false;

// Draw the wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;

    for (let i = 0; i < numSegments; i++) {
        const startAngle = currentAngle + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = prizes[i].color;
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = "white";
        ctx.font = "16px Poppins";
        ctx.textAlign = "center";
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.fillText(prizes[i].text, radius / 1.5, 10);
        ctx.restore();
    }
}

// Spin animation
function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spinTime = 3000; // Total spin duration
    let startTime = null;
    const finalRotation = Math.random() * (2 * Math.PI) + (5 * 2 * Math.PI); // Random final stop

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;

        if (progress < spinTime) {
            currentAngle += (finalRotation / spinTime) * (progress / 16);
            drawWheel();
            requestAnimationFrame(animateSpin);
        } else {
            currentAngle = finalRotation % (2 * Math.PI);
            determinePrize();
            spinning = false;
        }
    }

    requestAnimationFrame(animateSpin);
}

// Determine the winning prize
function determinePrize() {
    let winningIndex = Math.floor((numSegments - (currentAngle / segmentAngle)) % numSegments);
    resultDiv.innerText = "You won: " + prizes[winningIndex].text;
}

drawWheel();
spinButton.addEventListener("click", spinWheel);
