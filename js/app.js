// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.randomSpeed = Math.floor(Math.random() * 100 + 1);
  this.randomPosition = Math.floor(Math.random() * 250 + 0);
  this.height = 60;
  this.width = 80;
  this.x = 0;
  this.y = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < 505) {
    this.x += 10 * (dt * this.randomSpeed);
  } else {
    this.x = 0;
  }
  this.y = this.randomPosition;

  let dx = this.x - player.x;
  let dy = this.y - player.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (
    this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
    this.height + this.y > player.y
  ) {
    // collision detected!
    console.log("colision detected");
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let bug = new Enemy();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = "images/char-boy.png";
  this.ctrlX = 200;
  this.ctrlY = 400;
  this.height = 50;
  this.width = 50;
  // this.x = 200;
  // this.y = 200;
};

Player.prototype.update = function() {
  this.x = this.ctrlX;
  this.y = this.ctrlY;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      if (this.ctrlX > 0) {
        this.ctrlX -= 100;
      } else {
        this.ctrlX = 0;
      }
      break;
    case "up":
      if (this.ctrlY > 0) {
        this.ctrlY -= 100;
      } else {
        this.ctrlY = 0;
      }
      break;
    case "right":
      if (this.ctrlX < 400) {
        this.ctrlX += 100;
      } else {
        this.ctrlX = 400;
      }
      break;
    case "down":
      if (this.ctrlY < 400) {
        this.ctrlY += 100;
      } else {
        this.ctrlY = 400;
      }
      break;
    // default:
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
allEnemies.push(bug);
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
