const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const tournamentMode = document.getElementById("tournamentMode");
const difficultySelect = document.getElementById("difficultySelect");

let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let botScore = parseInt(localStorage.getItem("botScore")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let maxRounds = parseInt(tournamentMode.value);
let currentRound = 1;
let isMultiplayer = false;

document.getElementById("userScore").textContent = userScore;
document.getElementById("botScore").textContent = botScore;
document.getElementById("highScore").textContent = highScore;

document.getElementById("multiplayerToggle").addEventListener("click", () => {
  isMultiplayer = !isMultiplayer;
  document.getElementById("multiplayerToggle").textContent = isMultiplayer ? "Multiplayer Mode" : "Single Player Mode";
});

tournamentMode.addEventListener("change", () => {
  maxRounds = parseInt(tournamentMode.value);
  currentRound = 1;
  document.getElementById("roundNumber").textContent = currentRound;
});

function saveProgress() {
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("botScore", botScore);
  localStorage.setItem("highScore", highScore);
}

function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);
  userResult.src = botResult.src = "images/rock.png";
  result.textContent = "Wait...";
  
  optionImages.forEach((image, index) => image.classList.toggle("active", index === clickedIndex));
  
  setTimeout(() => {
    const botChoice = Math.floor(Math.random() * 3);
    userResult.src = clickedImage.querySelector("img").src;
    botResult.src = ["images/rock.png", "images/paper.png", "images/scissors.png"][botChoice];

    const outcomes = { RR: "Draw", RP: "BOT", RS: "YOU", PP: "Draw", PR: "YOU", PS: "BOT", SS: "Draw", SR: "BOT", SP: "YOU" };
    const resultKey = ["R", "P", "S"][clickedIndex] + ["R", "P", "S"][botChoice];
    let winner = outcomes[resultKey] || "Unknown";

    result.textContent = winner === "Draw" ? "Match Draw" : `${winner} WON!`;
    
    if (winner === "YOU") userScore++;
    else if (winner === "BOT") botScore++;

    saveProgress();
    document.getElementById("userScore").textContent = userScore;
    document.getElementById("botScore").textContent = botScore;
  }, 2500);
}

optionImages.forEach(image => image.addEventListener("click", handleOptionClick));
