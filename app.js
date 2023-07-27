// Write your JavaScript code here

var playerChoice = "";
var computerChoice = "";

var emojis = ["🪨", "📄", "✂️"];
var currentEmojiIndex = 0;
var shuffleInterval = setInterval(shuffleEmojis, 120);

var playerChoiceContainer = document.getElementById("player-choice-container");
var emojiShuffleElement = document.getElementById("emoji-shuffle");
var playAgainButton = document.getElementById("play-again-button");
var refreshScoreButton = document.getElementById("refresh-score-button");

playerChoiceContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("emoji")) return;

  playerChoice = event.target.textContent;
  playerChoiceContainer.innerHTML = `<p class="emoji">${playerChoice}</p>`;

  clearInterval(shuffleInterval);

  gameWinner();
});

function shuffleEmojis() {
  computerChoice = emojis[currentEmojiIndex];
  emojiShuffleElement.textContent = computerChoice;

  if (currentEmojiIndex < emojis.length - 1) {
    currentEmojiIndex++;
  } else {
    currentEmojiIndex = 0;
  }
}

var playerWins = 0;
var computerWins = 0;

getLocalStorage();
var gameResultScore = document.querySelector("#game-result-score");

function gameWinner() {
  var gameResultMsgElement = document.querySelector("#game-result-message");
  var gameResultMsg = "";

  if (playerChoice === computerChoice) {
    gameResultMsg = "It's a tie!";
  } else if (playerChoice === "🪨" && computerChoice === "✂️") {
    gameResultMsg = "You win!";
  } else if (playerChoice === "📄" && computerChoice === "🪨") {
    gameResultMsg = "You win!";
  } else if (playerChoice === "✂️" && computerChoice === "📄") {
    gameResultMsg = "You win!";
  } else {
    gameResultMsg = "You lose!";
  }

  if (gameResultMsg === "You win!") {
    playerWins++;
  }

  if (gameResultMsg === "You lose!") {
    computerWins++;
  }

  var data = {
    playerWins: playerWins,
    computerWins: computerWins,
  };
  addToLocalStorage(data);

  gameResultMsgElement.textContent = gameResultMsg;
  playAgainButton.classList.remove("hidden");
}

gameResultScore.textContent = `Player: ${playerWins} - Computer: ${computerWins}`;

function addToLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

function getLocalStorage() {
  var data = JSON.parse(localStorage.getItem("data"));
  if (data) {
    playerWins = data.playerWins;
    computerWins = data.computerWins;
  }
}

playAgainButton.addEventListener("click", () => {
  window.location.reload();
});

refreshScoreButton.addEventListener("click", () => {
    playerWins = 0;
    computerWins = 0;
    gameResultScore.textContent = `Player: ${playerWins} - Computer: ${computerWins}`;
    localStorage.clear();
});
