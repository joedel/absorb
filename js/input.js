;(function(exports) {

    function Input() {
        this.key = {};
        this.key.space = false;
        this.key.left = false;
        this.key.up = false;
        this.key.down = false;
        this.key.right = false;
        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
    }

    Input.prototype = {
        keydown: function(e) {
            e.preventDefault();
            var code = e.keyCode;
            if (code === 32) {
                this.key.space = true;
            } else if (code === 37) {
                this.key.left = true;
            } else if (code === 39) {
                this.key.right = true;
            } else if (code === 38) {
                this.key.up = true;
            } else if (code === 40) {
                this.key.down = true;
            }
        },
        keyup: function(e) {
            e.preventDefault();
            var code = e.keyCode;
            if (code === 32) {
                this.key.space = false;
            } else if (code === 37) {
                this.key.left = false;
            } else if (code === 39) {
                this.key.right = false;
            } else if (code === 38) {
                this.key.up = false;
            } else if (code === 40) {
                this.key.down = false;
            }
        }
    };

    exports.Input = Input;
})(this.Game);

