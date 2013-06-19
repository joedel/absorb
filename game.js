;(function(exports) {

    function Game(ctx) {
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.width = 700;
        this.height = 700;
        this.elements = [];
        this.input = new Game.Input();
        this.intro = true;
        this.gameOver = false;
        this.running = false;
    }

    Game.prototype = {
        update: function() {
            if (this.intro || this.gameOver) {
                if (this.input.key.space) {
                    this.intro = false;
                    this.gameOver = false;
                    this.running = true;
                    for (var i = 0; i<this.elements.length; i++) {
                        this.elements.splice(this.elements.indexOf(this.elements[i]), 1);
                    }
                    for (var i = 0; i<100; i++) {
                        var x = this.randomInt(40,700);
                        var y = this.randomInt(40,700);
                        var radius = this.randomInt(0,50);
                        this.elements.push(new Game.Enemy(this,x,y,radius));
                    }
                    this.elements.push(new Game.Player(this));

                }
            }

            for (var i =0; i<this.elements.length; i++) {
                for (var j=1; j<this.elements.length; j++) {
                    if (this.collision(this.elements[i], this.elements[j])) {
                        if (this.elements[i] !== this.elements[j]) {
                            this.elements[j].collision(this.elements[i]);
                            this.elements[i].collision(this.elements[j]);
                        }
                    }
                }
            }

            for (var i =0; i<this.elements.length; i++) {
                this.elements[i].update();
            }
        },
        draw: function() {
            if (this.intro) {
                this.ctx.canvas.width = this.width;
                this.ctx.canvas.height = this.height;
                this.ctx.fillRect(0,0,this.width,this.height);
                this.ctx.fillStyle = "#FFFFFF";
                this.ctx.font = "20pt Open Sans";
                this.ctx.fillText("Space to Start",this.width/2 - 70, this.height/2);
            }
            if (this.gameOver) {
                this.ctx.canvas.width = this.width;
                this.ctx.canvas.height = this.height;
                this.ctx.fillRect(0,0,this.width,this.height);
                this.ctx.fillStyle = "#FFFFFF";
                this.ctx.font = "20pt Open Sans";
                this.ctx.fillText("Game Over",this.width/2 - 70, this.height/2);
            }
            if (this.running && !this.gameOver) {
                this.ctx.canvas.width = this.width;
                this.ctx.canvas.height = this.height;
                this.ctx.fillRect(0,0,this.width,this.height);

                for (var i =0; i<this.elements.length; i++) {
                    this.elements[i].draw();
                }
            }
        },
        loop: function() {
            this.update();
            this.draw();
        },
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        init: function() {
            this.input.listener();
        },

        //Collision functions based on Coquette by Mary Rose Cook
        collision: function(obj1, obj2) {
           return this.distance(this.center(obj1), this.center(obj2)) < obj1.radius + obj2.radius;
//            var centerX = obj1.x + obj1.radius;
//            var centerY = obj1.y + obj1.radius;
//            var center2X = obj2.x + obj2.radius;
//            var center2Y = obj2.y + obj2.radius;
//            var distance = Math.sqrt((centerX - center2X) * (centerX - center2X)) +
//                ((centerY - center2Y) * (centerY - center2Y));
//            if (distance < obj1.radius + obj2.radius) {
//                return true;
//            }
        },
        center: function(obj) {
            return {x: obj.x + obj.radius, y: obj.y + obj.radius }
        },
        distance: function(point1, point2) {
            var x = point1.x - point2.x;
            var y = point1.y - point2.y;
            return Math.sqrt((x * x) + (y * y));
        }
    }
    exports.Game = Game;
})(this);