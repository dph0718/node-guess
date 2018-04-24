
//makes a Letter object, and checks against the guess.
module.exports = class Letter {
    constructor(letter) {
        this.letter = letter;
        this.display = function () {
            if (this.guessed == false) {
                return ('_');
            } else if (this.guessed == true) {
                return (`${letter}`);
            }
        }
        this.checks = function (guess) {
            if (this.letter == guess) {
                this.guessed = true;
                this.display();
            }
        }
    }
}