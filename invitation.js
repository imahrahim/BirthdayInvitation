let playerName = localStorage.getItem('playerName');

function sendResponse(response) {
  let templateParams = {
    player_name: playerName,
    message: response
  };

  emailjs.send('service_8l98fc7', 'template_5dmqkeo', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert('Deine Antwort wurde gesendet!');
       window.location.href = 'gameover.html';
    }, function(error) {
       console.log('FAILED...', error);
       alert('Fehler beim Senden deiner Antwort.');
    });
}
