let numbersOfWords = [];
let chosenWord;
const WordJs = require('./word.js');
const inquirer = require('inquirer');
const wordList = [
    "familiar",
    "assignment",
    "hangman"
]
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphArray = alphabet.split('');


let wordArray = [];
let guessedLetters = [];
//What it do when user guesses the word
function win() {
    guessedLetters = [];
    console.log("You have avoided your teacher's wratch. For now...");
    inquirer.prompt({
        name: 'again',
        message: "Play again?",
        type: 'confirm',
    })
        .then(function (res) {
            if (res.again) {
                chooseWord();
                console.log("Here we go...");
                guessLetter();

                //Function that chooses random word from word list
            } else {
                console.log("K bye");
                setTimeout(function () { process.exit }, 1000);
            }
        })
}

//Prompts if the user would like to play again.
function restartPrompt() {
    inquirer.prompt({
        name: 'restart',
        message: "You've guessed all the words. Would you like to restart?",
        type: 'confirm'
    })
        .then(function (resp) {
            if (resp.restart) {
                startGame();
            } else {
                console.log("K. Bye. ");
                setTimeout(function () { process.exit }, 1000);
            }
        })
}
//makes a number array to pick words atrandom.
function setNumbers() {
    for (var i = 0; i < wordList.length; i++) {
        numbersOfWords.push(i);
    };
}
//uses the array made by setNumbers() to choose a random word from the array of Word objects
function chooseWord() {
    let rand = Math.floor(Math.random() * numbersOfWords.length);
    randNum = numbersOfWords[rand];
    chosenWord = wordArray[randNum];
    numbersOfWords.splice(rand, 1);
    console.log(`Your word is ${chosenWord.letterObjectArray.length} letters long.`);
    chosenWord.reset();
    chosenWord.show('');
}
//makes Word objects from the array wordlist
function setWords() {
    wordList.forEach(function (j) {
        let newWord = new WordJs(j);
        newWord.makeLetterObjectArray();
        wordArray.push(newWord);
        newWord.reset();
    })
}
//includes prompt and logic for validating user input (but not using inquirer's validate. That documentation didn't make any sense.)
function guessLetter() {
    inquirer.prompt({
        name: 'letter',
        message: "Guess a letter. (Type 'letter' to see your guessed letters.)",
        type: 'input',
    })
        .then(function (res) {
            // check to see if it's a single letter.
            let ltr = res.letter.toLowerCase();
            let pass = false;
            let resArray = res.letter.split('');
            if (res.letter == 'letter') {
                console.log(`You've already guessed: ${guessedLetters.join(', ')}`);
                guessLetter();
            } else if (resArray.length > 1) {
                console.log(`Your teacher breaks a ruler against the desk. "Don't be a clown. Just guess a single letter!"`);
                guessLetter();
            } else if (!alphArray.includes(ltr)) {
                console.log(`Your teacher punches a hole in the wall and asks, "Are you trying to be dense? That is not a letter!"`);
                guessLetter();
            } else if (alphArray.includes(ltr)) {
                pass = true;
            }

            if (pass == true) {
                if (guessedLetters.includes(ltr)) {
                    console.log(`Your teacher screams, "YOU'VE ALREADY GUESSED "${ltr.toUpperCase()}," DUMMY!`);
                    guessLetter();
                } else {
                    chosenWord.check(ltr);
                    guessedLetters.push(ltr);
                    if (chosenWord.win == true) {
                        if (numbersOfWords.length > 0) {
                            win();
                        } else {
                            restartPrompt();
                        }
                    } else if (chosenWord.wrong < 6) {
                        guessLetter();
                    }
                }
            }
        })
}

//first question for the user. Determines which elementary school teacher the user will be imagining.
function scaryTeacher() {
    inquirer.prompt({
        name: 'teacher',
        message: 'Who was your least favorite elementary school teacher?',
        type: 'list',
        choices: [
            'kindergarten', '1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade'
        ]
    }).then(function (resp) {
        console.log(`As you step into a dank, dimly-lit classroom, a familiar face - your ${resp.teacher} teacher, but with no eyes and a curious case of reverse male-pattern baldness - demands that you guess letters.`);
        startGame();
    })
}
//includes all the functions needed to start the game.
function startGame() {
    setNumbers();
    setWords();
    chooseWord();
    guessLetter();
}
//this gets it started.
scaryTeacher();