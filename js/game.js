;(function(exports) {

    function Game(ctx) {

        this.ctx = document.getElementById("canvas").getContext("2d");
        this.elements = [];
        this.input = new Game.Input();
        this.intro = true;
        this.gameOver = false;
        this.win = false;

        if (typeof window.innerWidth !== 'undefined') {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        } else {
            this.width = 700;
            this.height = 700;
        }
    }

    Game.prototype = {
        update: function() {
            if (this.intro || this.gameOver || this.win) {
                if (this.input.key.space) {
                    this.startGame();
                }
            }

            for (var k=0; k<this.elements.length; k++) {
                for (var m=1; m<this.elements.length; m++) {
                    if (this.collision(this.elements[k], this.elements[m])) {
                        if (this.elements[k] !== this.elements[m]) {
                            this.elements[m].collision(this.elements[k]);
                            this.elements[k].collision(this.elements[m]);
                        }
                    }
                }
            }

            for (var n = 0; n<this.elements.length; n++) {
                this.elements[n].update();
            }
        },
        draw: function() {
            this.ctx.canvas.width = this.width;
            this.ctx.canvas.height = this.height;
            this.ctx.fillRect(0,0,this.width,this.height);

            if (this.intro) {
                this.drawScreen("Space to Start", "(Arrow Keys to Control");
            } else if (this.gameOver) {
                this.drawScreen("Game Over", "(Space to Start)");
            } else if (this.win) {
                this.drawScreen("You Win!", "(Space to Start");
            } else {
                for (var i=0; i<this.elements.length; i++) {
                    this.elements[i].draw();
                }
            }
        },
        drawCircle: function(circle) {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = circle.fillStyle;
            this.ctx.fill();
            this.ctx.closePath();
        },
        drawScreen: function(text1, text2) {
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "20pt Open Sans";
            this.ctx.fillText(text1,this.width/2, this.height/2);
            this.ctx.font = "12pt Open Sans";
            this.ctx.fillStyle = "#CCCCCC";
            this.ctx.fillText(text2, this.width/2, this.height/2 + 24);
        },
        startGame: function() {
            this.intro = false;
            this.gameOver = false;
            this.win = false;

            this.elements = [];
            this.createEnemies();
            this.elements.push(new Game.Player(this));
        },
        createEnemies: function(amount) {
            if (!amount) {
                var amount = Math.floor(this.width / 10);
            }

            for (var j = 0; j<amount; j++) {
                var x = this.randomInt(0,this.width),
                    y = this.randomInt(0,this.height),
                    radius = this.randomInt(0,40);
                
                this.elements.push(new Game.Enemy(this,x,y,radius));
            }
        },
        loop: function() {
            this.update();
            this.draw();
        },
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        //Collision functions based on Coquette by Mary Rose Cook
        collision: function(obj1, obj2) {
           return this.distance(obj1, obj2) < obj1.radius + obj2.radius;
        },
        center: function(obj) {
            return {x: obj.x + obj.radius, y: obj.y + obj.radius };
        },
        distance: function(point1, point2) {
            var x = point1.x - point2.x;
            var y = point1.y - point2.y;
            return Math.sqrt((x * x) + (y * y));
        }
    };
    exports.Game = Game;
})(this);