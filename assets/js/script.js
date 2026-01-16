const gameArea = document.getElementById("game-area");
const cards = ["tree", "sun", "moon", "happy", "three", "cat"];
const deck = [...cards, ...cards];
let firstCard = null;
let secondCard = null;
let isBusy = false;
const movesSpan = document.getElementById("moves");
let moves = 0;

function shuffle(array) {
    for (let i = array.length -1; i > 0; i-- ) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

shuffle(deck);

for (let index = 0; index < deck.length; index++) {
const button = document.createElement("button");
    button.classList.add("card");
    button.classList.add("hidden")
    button.textContent= deck[index];
    gameArea.append(button);
    button.onclick = function () {
  if (isBusy) return;
  if (button === firstCard) return;
  if (!button.classList.contains("hidden")) return;
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
