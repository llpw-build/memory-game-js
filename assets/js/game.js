// Game logic

// Get the container
const gameArea = document.getElementById("game-area");

// Only run code is game is on the current page
if (gameArea) {
  const cards = ["tree", "sun", "moon", "happy", "three", "cat"];

  // Duplicate cards to make pairs
  let deck = [...cards, ...cards];

  // Track what pair of cards are flipped
  let firstCard = null;
  let secondCard = null;

  // Block clicks during animations
  let isBusy = false;

  // Stats for game
  const movesSpan = document.getElementById("moves");
  let moves = 0;

  const matchesSpan = document.getElementById("matches");
  let matches = 0;

  const scoreSpan = document.getElementById("score");
  let score = 0;

  // Restart button
  const restartButton = document.getElementById("game-button");

  // Timer
  const timeLeft = document.getElementById("timer");
  let timer = 30;

  const gameMessage = document.getElementById("game-message");

  let timerStarted = false;
  let startTimer = null;
  let isGameOver = false;

  // Shuffle the deck
  const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };

  // Reset the game
  const resetGame = function () {
    isGameOver = false;

    clearInterval(startTimer);
    startTimer = null;

    timer = 30;
    if (timeLeft) timeLeft.textContent = timer;

    timerStarted = false;
    if (gameMessage) gameMessage.innerHTML = "";

    gameArea.innerHTML = "";
    firstCard = null;
    secondCard = null;
    isBusy = false;

    moves = 0;
    matches = 0;
    score = 0;

    if (movesSpan) movesSpan.textContent = moves;
    if (matchesSpan) matchesSpan.textContent = matches;
    if (scoreSpan) scoreSpan.textContent = score;

    deck = [...cards, ...cards];
    shuffle(deck);

    // Update high scores if shown on this page
    if (typeof renderHighScores === "function") {
      renderHighScores();
    }

    // Create card buttons
    for (let index = 0; index < deck.length; index++) {
      const button = document.createElement("button");
      button.classList.add("card", "hidden");
      button.textContent = deck[index];
      gameArea.append(button);

      // Handle card clicks
      button.onclick = function () {
        if (isGameOver) return;
        if (isBusy) return;
        if (button === firstCard) return;
        if (!button.classList.contains("hidden")) return;

        // Start timer on first click
        if (timerStarted === false) {
          timerStarted = true;

          startTimer = setInterval(function () {
            timer--;
            if (timeLeft) timeLeft.textContent = timer;

            if (timer <= 0) {
              if (timeLeft) timeLeft.textContent = 0;
              if (gameMessage) gameMessage.innerHTML = "Game over. Time ran out.";
              clearInterval(startTimer);
              isGameOver = true;
              return;
            }
          }, 1000);
        }

        // First card flip
        if (firstCard === null) {
          firstCard = button;
          button.classList.remove("hidden");
          return;
        }

        // Second card flip
        if (secondCard === null) {
          secondCard = button;
          button.classList.remove("hidden");

          moves++;
          if (movesSpan) movesSpan.textContent = moves;

          // Check for a match
          if (firstCard.textContent === secondCard.textContent) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            score += 3;
            if (scoreSpan) scoreSpan.textContent = score;

            matches++;
            if (matchesSpan) matchesSpan.textContent = matches;

            // Win condition
            if (matches === cards.length) {
              firstCard = null;
              secondCard = null;

              isGameOver = true;
              clearInterval(startTimer);
              if (gameMessage)
                gameMessage.innerHTML = "Congratulations! You have won!";

              const winscore = {
                moves: moves,
                score: score,
                timeLeft: timer,
                playedAt: new Date().toISOString(),
              };

              // Save and update high scores
              if (typeof addHighScore === "function") {
                addHighScore(winscore);
              }

              if (typeof renderHighScores === "function") {
                renderHighScores();
              }

              return;
            }

            firstCard = null;
            secondCard = null;
            return;
          }

          // No match, hide cards again
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
  };

  // Restart game when button is clicked
  if (restartButton) restartButton.onclick = resetGame;

  // Start the game on page load
  resetGame();
}
