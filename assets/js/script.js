const gameArea = document.getElementById("game-area");
const cards = ["tree", "sun", "moon", "happy", "three", "cat"];
let deck = [...cards, ...cards];
let firstCard = null;
let secondCard = null;
let isBusy = false;
const movesSpan = document.getElementById("moves");
let moves = 0;
const matchesSpan = document.getElementById("matches");
let matches = 0;
const scoreSpan = document.getElementById("score");
let score = 0;
const restartButton = document.getElementById("game-button");
restartButton.onclick = resetGame;
const timeLeft = document.getElementById("timer");
let timer = 30;
const gameMessage = document.getElementById("game-message");
let timerStarted = false;
let startTimer = null;
let isGameOver = false;
const highScores = document.getElementById("highscores");
const highScoreskey = "highscores";
const maxScoresList = 5;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function resetGame() {
  isGameOver = false;
  clearInterval(startTimer);
  startTimer = null;
  timer = 30;
  timeLeft.textContent = timer;
  timerStarted = false;
  gameMessage.innerHTML = "";
  gameArea.innerHTML = "";
  firstCard = null;
  secondCard = null;
  isBusy = false;
  moves = 0;
  matches = 0;
  score = 0;
  movesSpan.textContent = moves;
  matchesSpan.textContent = matches;
  scoreSpan.textContent = score;
  deck = [...cards, ...cards];
  shuffle(deck);
  for (let index = 0; index < deck.length; index++) {
    const button = document.createElement("button");
    button.classList.add("card");
    button.classList.add("hidden");
    button.textContent = deck[index];
    gameArea.append(button);
    button.onclick = function () {
      if (isGameOver) return;
      if (isBusy) return;
      if (button === firstCard) return;
      if (!button.classList.contains("hidden")) return;
      if (timerStarted === false) {
        timerStarted = true;
        startTimer = setInterval(function () {
          timer--;
          timeLeft.textContent = timer;
          if (timer <= 0) {
            timeLeft.innerHTML = 0;
            gameMessage.innerHTML = "Game over. Try Again.";
            clearInterval(startTimer);
            isGameOver = true;
            return;
          }
        }, 1000);
      }
      if (firstCard === null) {
        firstCard = button;
        button.classList.remove("hidden");
        return;
      }
      if (secondCard === null) {
        secondCard = button;
        button.classList.remove("hidden");
        moves++;
        movesSpan.textContent = moves;
        if (firstCard.textContent === secondCard.textContent) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          score += 3;
          scoreSpan.textContent = score;
          matches++;
          matchesSpan.textContent = matches;
          if (matches === cards.length) {
            firstCard = null;
            secondCard = null;
            isGameOver = true;
            clearInterval(startTimer);
            gameMessage.innerHTML = "Congratulations! You have won!";
            const winscore = {
              moves,
              score,
              timeLeft: timer,
            };
            JSON.stringify(winscore);
            return;
          }
          firstCard = null;
          secondCard = null;
          return;
        }
        isBusy = true;
        setTimeout(function () {
          firstCard.classList.add("hidden");
          secondCard.classList.add("hidden");
          firstCard = null;
          secondCard = null;
          isBusy = false;
        }, 700);
      }
    };
  }
}

resetGame();
