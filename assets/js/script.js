const gameArea = document.getElementById("game-area");
const cards = ["tree", "sun", "moon", "happy", "three", "cat", "dog"];
const deck = [...cards, ...cards];

function shuffle(array) {
    for (let i = array.length -1; i > 0; i-- ) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    }
    return array;
}

shuffle(deck);

for (let index = 0; index < deck.length; index++) {
const button = document.createElement("button");
    button.classList.add("card");
    button.textContent= deck[index];
    gameArea.append(button);
}



