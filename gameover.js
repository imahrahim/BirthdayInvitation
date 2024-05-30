function startOver() {
  window.location.href = 'start.html';
}

function showScores() {
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  let scoreHistory = document.getElementById('score-history');
  scoreHistory.innerHTML = '<div id="score-history-title">Score History</div>'; // Set the title
  for (let i = scores.length - 1; i >= 0; i--) { // Reverse the order of the scores
    scoreHistory.innerHTML += `
      <div class="score-entry">
        <div class="score-name">${scores[i].name}</div>
        <div class="score-value">${scores[i].score}</div>
      </div>`;
  }
}

window.onload = showScores;
