const gameArea = document.getElementById("game-area");
const cards = ["tree", "sun", "moon", "happy", "three"];
const deck = [...cards, ...cards];

for (let index = 0; index < deck.length; index++) {
const button = document.createElement("button");
    button.classList.add("card");
    button.textContent= deck[index];
    gameArea.append(button);
}


