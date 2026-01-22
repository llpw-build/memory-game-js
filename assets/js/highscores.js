// Highscores UI + local storage

// Get list, key name for storage, maximum number for list
const highScores =  document.getElementById("highscores");
const highScoresKey = "highscores";
const maxScoresList = 5;    

// Load high-scores from local storage 
function loadHighScores() {
    const saved = localStorage.getItem(highScoresKey);
    return saved ? JSON.parse(saved) : [];
}

// Save high-scores back into localStorage 
function saveHighScores(scores) {
    localStorage.setItem(highScoresKey, JSON.stringify(scores));
}

// Add new score and trim to top 5 only
function addHighScore(newScore) {
    const scores = loadHighScores();
    scores.push(newScore);


// Sort formula 
scores.sort((a,b) => (b.score - a.score) || (b.timeLeft - a.timeLeft));

// Keep only the top 5 scores
const trimmed = scores.slice(0, maxScoresList);

// Save updated scores
saveHighScores(trimmed);

return trimmed;
}

// Display high-scores on the html page
function renderHighScores() {
    // Stops if highscores does not exist on the page
    if (!highScores) return;
    
    // Load saved high-scores 
    const scores = loadHighScores();

    // Clear list to avoid duplicating when rendering 
    highScores.innerHTML="";

    // Show a message if no scores in local storage
    if (scores.length === 0) {
        const li = document.createElement("li");
        li.textContent="No high-scores yet, win a game!";
        highScores.appendChild(li);
        return;
    }

    // Create an item to display high-scores
    scores.forEach((s, i) => {
        const li = document.createElement("li");
        li.textContent= `#${i + 1} — Score: ${s.score} | Time Left: ${s.timeLeft}s | Moves: ${s.moves}`;
    highScores.appendChild(li);
    });
}

// Show high-scores when file loads
renderHighScores();
