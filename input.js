;(function(exports) {

    function Input() {
        this.key = {};
        this.key.space = false;
        this.key.left = false;
        this.key.up = false;
        this.key.down = false;
        this.key.right = false;
    }

    Input.prototype = {
        listener: function() {
            window.addEventListener("keydown", this.keydown.bind(this));
            window.addEventListener("keyup", this.keyup.bind(this));
        },
        keydown: function(e) {
            e.preventDefault();
            var code = e.keyCode;
            switch (code) {
                case 32:
                    this.key.space = true;
                    break;
                case 37:
                    this.key.left = true;
                    break;
                case 39:
                    this.key.right = true;
                    break;
                case 38:
                    this.key.up = true;
                    break;
                case 40:
                    this.key.down = true;
                    break;
                default:
                    break;
            }
        },
        keyup: function(e) {
            e.preventDefault();
            var code = e.keyCode;
            if (code === 32) {
                this.key.space = false;
            }
            if (code === 37) {
                this.key.left = false;
            }
            if (code === 39) {
                this.key.right = false;
            }
            if (code === 38) {
                this.key.up = false;
            }
            if (code === 40) {
                this.key.down = false;
            }
        }
    }

    exports.Input = Input;
})(this.Game);

