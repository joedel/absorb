;(function(exports) {

    function Enemy(game, x, y, radius) {
        this.game = game;
        this.fillStyle = "#FF0000";
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
            this.game.drawCircle(this);
        },
        collision: function(object) {
            if (object instanceof Enemy) {
                if (this.radius >= object.radius){
                    this.radius += 0.05;
                    if (object.radius < 1) {
                        object.radius = 0;
                    } else {
                        object.radius -= 0.3;
                    }
                }
            }
        }
    };
    exports.Enemy = Enemy;
})(this.Game);