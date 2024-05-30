let bird;
let clouds = [];
let score = 0;
let gameOver = false;
let invitationShown = false;
let distanceTraveled = 0;
const targetDistance = 5000; // Define a target distance in pixels
let playerName = localStorage.getItem('playerName');
let scores = JSON.parse(localStorage.getItem('scores')) || [];

let birdImg;
let cloudImg;
let specialCloudImg;
let specialCloudGenerated = false; // Flag to ensure only one special cloud is generated

function preload() {
  birdImg = loadImage('https://raw.githubusercontent.com/imahrahim/BirthdayInvitation/main/imgs/bird.png');
  cloudImg = loadImage('https://raw.githubusercontent.com/imahrahim/BirthdayInvitation/main//imgs/cloud.png');
  specialCloudImg = loadImage('https://raw.githubusercontent.com/imahrahim/BirthdayInvitation/main//imgs/cloud.png');
}

function setup() {
  createCanvas(400, 800);
  frameRate(60); // Ensure a consistent frame rate
  bird = new Bird();
  clouds.push(new Cloud(false)); // Add first cloud as normal
}

function draw() {
  background(42, 42, 149);

  if (invitationShown) {
    showInvitation();
  } else if (!gameOver) {
    bird.update();
    bird.show();

    // Generate clouds randomly until the target distance is reached
    if (frameCount % 50 === 0 && distanceTraveled < targetDistance) {
      clouds.push(new Cloud(false));
    }

    // Generate the special cloud once the target distance is reached
    if (distanceTraveled >= targetDistance && !specialCloudGenerated) {
      clouds.push(new Cloud(true));
      specialCloudGenerated = true; // Set flag to true to prevent further generation
    }

    for (let i = clouds.length - 1; i >= 0; i--) {
      clouds[i].update();
      clouds[i].show();

      if (clouds[i].hits(bird)) {
        gameOver = true;
        recordScore();
        noLoop();
        setTimeout(() => {
          window.location.href = 'gameover.html';
        }, 10);
      }

      if (clouds[i].offscreen()) {
        if (!clouds[i].isSpecial) {
          score++;
        }
        clouds.splice(i, 1);
      }

      // Check if the special cloud has been passed and show the invitation
      if (specialCloudGenerated && clouds.length === 0) {
        invitationShown = true;
        noLoop();
        setTimeout(() => {
          window.location.href = 'invitation.html';
        }, 10);
      }
    }

    textAlign(CENTER, CENTER);
    fill('chartreuse');
    textFont('Plank');
    textSize(32);
    text(score, width / 2, 30);

    // Increase the distance traveled
    distanceTraveled += 4; // Assuming a speed of 4 pixels per frame
  }
}

function mousePressed() {
  if (!gameOver && !invitationShown) {
    bird.up();
  }
}

function touchStarted() {
  if (!gameOver && !invitationShown) {
    bird.up();
  }
  return false;
}

function recordScore() {
  scores.push({ name: playerName, score: score });
  localStorage.setItem('scores', JSON.stringify(scores));
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 1;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    image(birdImg, this.x, this.y, 32, 32); // Display bird image
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Cloud {
  constructor(isSpecial) {
    this.isSpecial = isSpecial;
    this.y = random(height / 6, (5 / 6) * height); // Random position of the cloud
    this.x = width;
    this.w = 64;
    this.h = 32; // Assume a fixed height for the cloud
    this.speed = 4;
  }

  show() {
    let cloudImage = this.isSpecial ? specialCloudImg : cloudImg;

    image(cloudImage, this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    let birdRect = {
      x: bird.x,
      y: bird.y,
      w: 32,
      h: 32
    };

    let cloudRect = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    };

    return collideRectRect(birdRect.x, birdRect.y, birdRect.w, birdRect.h, cloudRect.x, cloudRect.y, cloudRect.w, cloudRect.h);
  }
}
