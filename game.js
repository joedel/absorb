;(function(exports) {

    function Game(ctx) {

        this.ctx = document.getElementById("canvas").getContext("2d");
        this.elements = [];
        this.input = new Game.Input();
        this.intro = true;
        this.gameOver = false;
        this.running = false;

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
            if (this.intro || this.gameOver) {
                if (this.input.key.space) {
                    this.intro = false;
                    this.gameOver = false;
                    this.running = true;
                    for (var i = 0; i<this.elements.length; i++) {
                        this.elements.splice(this.elements.indexOf(this.elements[i]), 1);
                    }
                    for (var j = 0; j<100; j++) {
                        var x = this.randomInt(0,this.width);
                        var y = this.randomInt(0,this.height);
                        var radius = this.randomInt(0,50);
                        this.elements.push(new Game.Enemy(this,x,y,radius));
                    }
                    this.elements.push(new Game.Player(this));
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
            if (this.intro) {
                this.ctx.canvas.width = this.width;
                this.ctx.canvas.height = this.height;
                this.ctx.fillRect(0,0,this.width,this.height);
                this.ctx.fillStyle = "#FFFFFF";
                this.ctx.font = "20pt Open Sans";
                this.ctx.fillText("Space to Start",this.width/2 - 70, this.height/2);
                this.ctx.font = "12pt Open Sans";
                this.ctx.fillStyle = "#CCCCCC";
                this.ctx.fillText("(Arrow Keys To Control)", this.width/2 - 77, this.height/2 + 24);
            }
            if (this.gameOver) {
                this.ctx.canvas.width = this.width;
                this.ctx.canvas.height = this.height;
                this.ctx.fillRect(0,0,this.width,this.height);
                this.ctx.fillStyle = "#FFFFFF";
                this.ctx.font = "20pt Open Sans";
                this.ctx.fillText("Game Over",this.width/2 - 70, this.height/2);
                this.ctx.font = "12pt Open Sans";
                this.ctx.fillStyle = "#CCCCCC";
                this.ctx.fillText("(Space To Start)", this.width/2 - 60, this.height/2 + 24);

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