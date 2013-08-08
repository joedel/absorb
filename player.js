;(function(exports) {

	function Player(game) {
        this.game = game;
        this.x = this.game.width/2 - 10;
        this.y = this.game.height/2 - 10;
        this.radius = 20;
        this.maxSpeed = 1;
        this.friction = 0.99;
        this.vx = 0;
        this.vy = 0;
        this.fillStyle = "rgba(255,255,255,0.9)";
	}

  Player.prototype = {
    update: function() {
      if (this.radius > 140) {
        this.game.win = true;
      }
      if (this.radius === 0) {
        this.game.gameOver = true;
      }

      if (this.x < 0-this.radius) {
          this.x = this.game.width;
      }
      if (this.x > this.game.width + this.radius) {
          this.x = 0;
      }
      if (this.y > this.game.height + this.radius) {
          this.y = 0;
      }
      if (this.y < 0-this.radius) {
          this.y = this.game.height;
      }

      if (this.game.input.key.space) {
      }
      if (this.game.input.key.left) {
        this.radius -= 0.002;
        if (this.vx >= -this.maxSpeed) {
          this.vx -= 0.2;
        }
      }
      if (this.game.input.key.right) {
        this.radius -= 0.002;
        if (this.vx <= this.maxSpeed) {
          this.vx += 0.2;
        }
      }
      if (this.game.input.key.up) {
        this.radius -= 0.002;
        if (this.vy >= -this.maxSpeed) {
          this.vy -= 0.2;
        }
      }
      if (this.game.input.key.down) {
        this.radius -= 0.002;
        if (this.vy <= this.maxSpeed) {
          this.vy += 0.2;
        }
      }
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;

    },
    draw: function() {
      this.game.ctx.beginPath();
      this.game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      this.game.ctx.fillStyle = this.fillStyle;
      this.game.ctx.fill();
      this.game.ctx.closePath();
    },
    collision: function(object) {
      if (object instanceof Game.Enemy) {
        if (this.radius >= object.radius){
          this.radius += 0.05;
          if (object.radius < 1) {
            object.radius = 0;
          } else {
            object.radius -= 0.3;
          }
        }
      if (this.radius < object.radius) {
        object.radius += 0.1;
        if (this.radius < 1) {
          this.radius = 0;
        } else {
          this.radius -= 0.1;
        }
      }
      }
    }
  };

	exports.Player = Player;
}(this.Game));