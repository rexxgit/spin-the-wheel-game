const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const resultDiv = document.getElementById("result");

// Adjusted prize probability
const prizes = [
    { text: "Free Shipping", color: "#28a745" }, // High probability
    { text: "Free Shipping", color: "#28a745" },
    { text: "Free Shipping", color: "#28a745" },
    { text: "10% OFF", color: "#ff4d4d" },       // Mid to high probability
    { text: "10% OFF", color: "#ff4d4d" },
    { text: "Seasonal Discount", color: "#ffbd33" },  // Medium probability
    { text: "Seasonal Discount", color: "#ffbd33" },
    { text: "None", color: "#cccccc" },          // Lower winning frequency
    { text: "None", color: "#cccccc" },
    { text: "None", color: "#cccccc" },
    { text: "Free Shoes", color: "#0000ff" }     // Extremely low probability
];

const numSegments = prizes.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentAngle = 0;
let spinning = false;

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

function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spinTime = 5000; // Slow down the total spin duration to 5 seconds
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

function determinePrize() {
    let winningIndex = Math.floor((numSegments - (currentAngle / segmentAngle)) % numSegments);
    resultDiv.innerText = "You won: " + prizes[winningIndex].text;
}

drawWheel();

spinButton.addEventListener("click", spinWheel);
