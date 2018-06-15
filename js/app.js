// Enemies our player must avoid
let Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  const position = function() {
    //fn to select random position mode
    const position = Math.ceil(Math.random() * 3);
    if (position === 1) {
      return 225;
    } else if (position === 2) {
      return 145;
    } else if (position === 3) {
      return 60;
    }
  };

  const speed = function() {
    // fn to select random speed mode
    const speed = Math.ceil(Math.random() * 3);
    if (speed === 1) {
      return 15;
    } else if (speed === 2) {
      return 25;
    } else if (speed === 3) {
      return 35;
    }
  };

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images

  this.sprite = "images/enemy-bug.png";
  this.randomSpeed = speed();
  this.randomPosition = position();
  this.height = 50;
  this.width = 50;
  this.x = 0;
  this.y = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.collisionDetection();

  if (this.x < 505) {
    this.x += 10 * (dt * this.randomSpeed);
  } else {
    this.x = 0;
  }
  this.y = this.randomPosition;
};

Enemy.prototype.collisionDetection = function() {
  // Adapted from MDN: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
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
    // console.log("colision detected");
    // return true;
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = "images/char-boy.png";
  this.ctrlX = 200;
  this.ctrlY = 400;
  this.height = 50;
  this.width = 50;
};

Player.prototype.reset = function() {
  this.ctrlX = 200;
  this.ctrlY = 400;
  allEnemies = [];
  while (allEnemies.length < 3) {
    allEnemies.push(new Enemy());
  }
};

Player.prototype.update = function() {
  this.x = this.ctrlX;
  this.y = this.ctrlY;
  if (this.y === -25) {
    this.reset();
  }
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
        this.ctrlY -= 85;
        console.log(this.ctrlY);
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
        this.ctrlY += 85;
        console.log(this.ctrlY);
      } else {
        this.ctrlY = 400;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
while (allEnemies.length < 3) {
  allEnemies.push(new Enemy());
}

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
