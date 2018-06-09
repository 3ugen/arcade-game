// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = 0;
  this.y = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += 10 * dt;
  this.y += 0 * dt;
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
  this.ctrlY = 200;
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
    this.ctrlX -= 100;
      break;
    case "up":
    this.ctrlY -= 100;
      break;
    case "right":
    this.ctrlX += 100;
      break;
    case "down":
    this.ctrlY += 100;
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
