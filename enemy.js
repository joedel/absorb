;(function(exports) {

    function Enemy(game, x, y, radius) {
        this.game = game;
        this.fillStyle = "red";
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    Enemy.prototype = {

        update: function() {
            if (this.radius <= 0) {
                this.game.elements.splice(this.game.elements.indexOf(this), 1);
            }

        },
        draw: function() {
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.game.ctx.fillStyle = this.fillStyle;
            this.game.ctx.fill();
        },
        collision: function(object) {
            if (object instanceof Enemy) {
                if (this.radius >= object.radius){
                    this.radius += .05;
                    if (object.radius < 1) {
                        object.radius = 0;
                    } else {
                        object.radius -= .3;
                    }
                }
            }
        }
    }
    exports.Enemy = Enemy;
})(this.Game);