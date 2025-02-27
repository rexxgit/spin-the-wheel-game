const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const resultDiv = document.getElementById("result");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");

const prizes = [
    { text: "Free Shipping", color: "#28a745" },
    { text: "10% OFF", color: "#ff4d4d" },
    { text: "Seasonal Discount", color: "#ffbd33" },
    { text: "None", color: "#cccccc" },
    { text: "Free Shoes", color: "#0000ff" }
];

const numSegments = prizes.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentAngle = 0;
let spinning = false;

function adjustCanvasSize() {
    canvas.width = window.innerWidth < 768 ? 300 : 400;
    canvas.height = window.innerWidth < 768 ? 300 : 400;
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    for (let i = 0; i < numSegments; i++) {
        const startAngle = currentAngle + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        const gradient = ctx.createRadialGradient(centerX, centerY, radius - 20, centerX, centerY, radius);
        gradient.addColorStop(0, prizes[i].color);
        gradient.addColorStop(1, "#ffffff");

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.stroke();

        // Text in the middle of each segment
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
    const initialSpeed = 0.08;  // Start speed of rotation
    const finalSpeed = 0.02;  // Speed towards the end

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;

        // Easing function: slow down towards the end
        let easeFactor = 1 - Math.pow(1 - progress / spinTime, 3); // Cubic easing function
        let rotationSpeed = initialSpeed + (finalSpeed - initialSpeed) * easeFactor;
        
        if (progress < spinTime) {
            currentAngle += rotationSpeed;
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
    let winningPrize = getWinningPrize();
    resultDiv.innerText = "You won: " + winningPrize.text;
    showPopup(winningPrize.text);
}

function getWinningPrize() {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    return prizes[randomIndex];
}

function showPopup(prizeText) {
    popup.style.display = 'flex';
    if (prizeText === "None") {
        popupMessage.textContent = "You Lose!";
        popup.style.backgroundColor = "#ff4d4d"; // Red for lose
    } else {
        popupMessage.textContent = "You Win!";
        popup.style.backgroundColor = "#28a745"; // Green for win
    }

    // Close popup after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

window.addEventListener("resize", adjustCanvasSize);

adjustCanvasSize();
drawWheel();

spinButton.addEventListener("click", spinWheel);
