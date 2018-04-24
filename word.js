const LetterJs = require('./letter.js');
let displayLetters = [];

//Very long Word object constructor.
//keeps track of guesses made during the word,
//makes Letter object arrays from the letter objects in letter.js
//records if the word was won or not.
//makes a bunch of snarky teacher responses.
//checks and displays each letter object as a "_" or the letter.
//and finally, resets the values for use in the next game.

module.exports = class Word {
    constructor(word) {
        this.word = word;
        this.guesses = 0;
        this.letterArray = word.split('');
        this.letterObjectArray = [];
        this.guessedletters = [];
        this.win = false;
        this.wrong = 0;
        let wrongResponses1 = [
            `Your teacher hits you in the back of the head with a yardstick`,
            `Your teacher kicks a desk over onto your foot`,
            `Your teacher throws an eraser at your head`,
            `Your teacher grabs a shovel from the supply closet and shakes it, scaring you,`,
            `You get stung by an errant bee, and your teacher laughs`,
            `Your teacher tosses a small tin of used staples at you`
        ];
        let wrongResponses2 = [
            `calls you a moron`,
            `says, "You deserved that,"`,
            `stares past you as you protest`,
            `and doesn't stop for a few minutes`,
            `throws the class hamster cage out of the window`,
            `eats a King-Size Snickers bar, even though she knows you're hungry`
        ]
        let loa = this.letterObjectArray;
        this.makeLetterObjectArray = function () {
            this.letterArray.forEach(function (i) {
                let newLetter = new LetterJs(i);
                loa.push(newLetter);
            })
        }
        this.retort = function () {
            let rand1 = Math.floor(Math.random() * wrongResponses1.length);
            let rand2 = Math.floor(Math.random() * wrongResponses2.length);
            console.log(`${wrongResponses1[rand1]} and ${wrongResponses2[rand2]} because you were wrong.`)
        }
        this.show = function (gus) {
            displayLetters = [];
            let sum = 0;
            let loa = this.letterObjectArray;
            for (let i = 0; i < loa.length; i++) {
                loa[i].checks(gus);
                let letters = loa[i].display();
                displayLetters.push(letters);
                if (loa[i].guessed == true) {
                    sum++;
                }
                if (sum == loa.length) {
                    this.win = true;
                }
            }
            console.log(displayLetters.join(' '));
        }
        this.check = function (guess) {
            displayLetters = [];
            let sum = 0;
            let loa = this.letterObjectArray;
            for (let i = 0; i < loa.length; i++) {
                loa[i].checks(guess);
                let letters = loa[i].display();
                displayLetters.push(letters);
                if (loa[i].guessed == true) {
                    sum++;
                }
                if (sum == loa.length) {
                    this.win = true;
                }
            }
            if (this.letterArray.includes(guess)) {
                console.log("Correct.");
            } else if (!this.letterArray.includes(guess)) {
                this.wrong++;
                this.retort();
                if(this.wrong == 5){
                    console.log(`\nYou aren't sure how much longer you can keep this up...`);
                } else if (this.wrong > 5) {
                    console.log(`You are too demoralized to continue.`);
                    setTimeout(function () {
                        console.log(`Your teacher will always be waiting here for you...`)
                    },
                        2000);
                    setTimeout(function () {
                        console.log(`Bye.`);
                        process.exit();
                    },
                        3000);
                }
            }
            console.log(displayLetters.join(' '));
        }
        this.reset = function () {
            for (let i = 0; i < loa.length; i++) {
                loa[i].guessed = false;
            }
            this.win = false;
            this.wrong = 0;
        }
    }
}