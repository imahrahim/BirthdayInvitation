function startGame() {
    let playerName = document.getElementById('nameInput').value;
    if (playerName === '') {
      alert('Bitte gib deinen Namen ein');
      return;
    }
    localStorage.setItem('playerName', playerName);
    window.location.href = 'game.html';
  }
  