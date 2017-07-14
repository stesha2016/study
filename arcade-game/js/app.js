const STEP_WIDTH = 101;
const STEP_HEIGHT = 83;

var Base = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Base.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * STEP_WIDTH, this.y * STEP_HEIGHT);
};

// Enemies our player must avoid
var Enemy = function(sprite, x, y) {
    Base.call(this, sprite, x, y);
};
Enemy.prototype = Object.create(Base.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x === 5) {
        this.x = 0;
    } else {
        this.x++;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x, y) {
    Base.call(this, sprite, x, y);
};
Player.prototype = Object.create(Base.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
};

Player.prototype.handleInput = function(key) {
    console.log('key = ' + key);
    switch(key) {
        case 'left':
            if (this.x === 0) {
                return;
            }
            this.x--;
            break;
    case 'up':
        if (this.y === 0) {
            return;
        }
        this.y--;
        break;
    case 'right':
        if (this.x === 5) {
            return;
        }
        this.x++;
        break;
    case 'down':
        if (this.y === 5) {
            return;
        }
        this.y++;
        break
    default:
        break;
    }
    this.render();
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy('images/enemy-bug.png', 0, 0);
var enemy2 = new Enemy('images/enemy-bug.png', 1, 1);
var enemy3 = new Enemy('images/enemy-bug.png', 3, 2);
var enemy4 = new Enemy('images/enemy-bug.png', 4, 4);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player('images/char-boy.png', 0, 5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    dump('keyup');
    player.handleInput(allowedKeys[e.keyCode]);
});
