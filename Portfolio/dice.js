let isRolling = false;
let rollInterval;

const rollingFrames = [
    "./img/velvet-orchid-500d90/frame1.jpg",
    "./img/velvet-orchid-500d90/frame2.jpg",
    "./img/velvet-orchid-500d90/frame3.jpg",
    "./img/velvet-orchid-500d90/frame4.jpg",
    "./img/velvet-orchid-500d90/frame5.jpg"
];

const diceFaces = [
    "./img/velvet-orchid-500d90/dice1.jpg",
    "./img/velvet-orchid-500d90/dice2.jpg",
    "./img/velvet-orchid-500d90/dice3.jpg",
    "./img/velvet-orchid-500d90/dice4.jpg",
    "./img/velvet-orchid-500d90/dice5.jpg",
    "./img/velvet-orchid-500d90/dice6.jpg"
];

const dice1Element = document.getElementById('dice1');
const dice2Element = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');
const diceSound = document.getElementById('diceSound');
const stopSound = document.getElementById('stopSound');

function preloadImages(array) {
    array.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

// Preload rolling frames and dice faces
preloadImages(rollingFrames);
preloadImages(diceFaces);

function startRolling() {
    isRolling = true;
    rollButton.textContent = "Stop Rolling!";
    diceSound.loop = true; // Enable looping sound
    diceSound.play(); // Start playing the sound

    let frameIndex = 0;
    rollInterval = setInterval(() => {
        // Cycle through the rolling frames for both dice
        dice1Element.src = rollingFrames[frameIndex];
        dice2Element.src = rollingFrames[frameIndex];
        frameIndex = (frameIndex + 1) % rollingFrames.length;
    }, 100); // Change frame every 100ms
}

function stopRolling() {
    isRolling = false;
    rollButton.textContent = "Roll Dice!";

    // Play the stop sound immediately
    stopSound.play();

    // Continue rolling for 0.5 seconds after the stop button is pressed
    setTimeout(() => {
        clearInterval(rollInterval);
        diceSound.pause(); // Stop the rolling sound
        diceSound.currentTime = 0; // Reset rolling sound to the beginning

        // Show a random actual dice face when the rolling stops
        const finalDiceIndex1 = Math.floor(Math.random() * diceFaces.length);
        const finalDiceIndex2 = Math.floor(Math.random() * diceFaces.length);
        dice1Element.src = diceFaces[finalDiceIndex1];
        dice2Element.src = diceFaces[finalDiceIndex2];
    }, 650);
}

rollButton.addEventListener('click', () => {
    if (isRolling) {
        stopRolling();
    } else {
        startRolling();
    }
});
