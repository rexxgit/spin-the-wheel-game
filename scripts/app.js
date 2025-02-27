const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const resultDiv = document.getElementById("result");

const prizes = [
    { text: "Free Shipping", color: "#28a745", weight: 3 }, 
    { text: "Free Shipping", color: "#28a745", weight: 3 },
    { text: "Free Shipping", color: "#28a745", weight: 3 },
    { text: "10% OFF", color: "#ff4d4d", weight: 2 },       
    { text: "10% OFF", color: "#ff4d4d", weight: 2 },
    { text: "Seasonal Discount", color: "#ffbd33", weight: 2 },  
    { text: "Seasonal Discount", color: "#ffbd33", weight: 2 },
    { text: "None", color: "#cccccc", weight: 1 },          
    { text: "None", color: "#cccccc", weight: 1 },
    { text: "None", color: "#cccccc", weight: 1 },
    { text: "Free Shoes", color: "#0000ff", weight: 0.5 }     
];

const numSegments = prizes.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentAngle = 0;
let spinning = false;

// Dynamically adjust canvas size
function adjustCanvasSize() {
    canvas.width = window.innerWidth < 768 ? 300 : 400;
    canvas.height = window.innerWidth < 768 ? 300 : 400;
}

// Draw 3D Wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

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

    let spinTime = 5000;
    let startTime = null;
    const finalRotation = Math.random() * (2 * Math.PI) + (5 * 2 * Math.PI);

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

function getWeightedPrize() {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    const randomWeight = Math.random() * totalWeight;
    
    let weightSum = 0;
    for (let i = 0; i < prizes.length; i++) {
        weightSum += prizes[i].weight;
        if (randomWeight <= weightSum) {
            return prizes[i];
        }
    }
    return prizes[prizes.length - 1];
}

function determinePrize() {
    let winningPrize = getWeightedPrize();
    resultDiv.innerText = "You won: " + winningPrize.text;
}

window.addEventListener("resize", adjustCanvasSize);

adjustCanvasSize();
drawWheel();

spinButton.addEventListener("click", spinWheel);
