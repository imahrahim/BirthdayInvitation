let playerName = localStorage.getItem('playerName');

function sendResponse(response) {
  let message = `Name: ${playerName}\nAntwort: ${response}`;
  console.log(message);
  alert('Deine Antwort wurde gesendet!');
  window.location.href = 'gameover.html';
}
