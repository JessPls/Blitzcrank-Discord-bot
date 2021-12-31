/**
 * Hangman will let players either play Hangman against the bot, or against another player (in the future)
 * Players guess letters in order to solve a word before they run out of guesses
 * 
 * v1.3.0 - Added Hangman
 * 
 * @author Jess Queen
 */

 // variable for the current game being played, if any
 var game;

 /**
  * The HangmanGame class will represent an ongoing game of Hangman
  */
 class HangmanGame {

    // count for how many wrong guesses there have been
    counter = 0;

    // the word to be guessed
    word = "";

    // the drawing of hangman

    // list of possible words for the computer to pick from
    words = [
        "giraffe", "dictionary", "beekeeper", "khaki", "penguin",
        "government", "fluffiness", "zodiac", "wyvern", "stronghold",
        "pneumonia", "matrix", "encyclopedia", "computer", "javascript",
        "antarctica", "segue", "orca", "notepad", "jeopardy",
        "mathematics", "astrology", "tomfoolery", "pseudoscience", "racecar"
    ];

    guesses = "";

    lettersGuessed = "";

    hangman = "";

    hangmanArt = [`\`  +---+\n      |\n      |\n      |\n      |\n      |\n=========\``, 

        `\`  +---+\n      |\n  O   |\n      |\n      |\n      |\n=========\``,

        `\`  +---+\n      |\n  O   |\n  |   |\n      |\n      |\n=========\``,

        `\`  +---+\n      |\n  O   |\n /|   |\n      |\n      |\n=========\``, 

        `\`  +---+\n      |\n  O   |\n /|\\  |\n      |\n      |\n=========\``,

        `\`  +---+\n      |\n  O   |\n /|\\  |\n /    |\n      |\n=========\``,

        `\`  +---+\n      |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========\``,

        `\`  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========\``];

    constructor() {}

    drawHangman(msg) {
        this.hangman = this.hangmanArt[this.counter];
        msg.channel.send(
            "\n" + this.guesses +
            "\n" + this.hangman +
            "\nLetters guessed: " + this.lettersGuessed
        );

        if (this.counter >= 7) {
            this.endGame(msg);
        } else if (this.guesses === this.word) {
            msg.channel.send("----------------------------------\nCongratulations, you guessed the word!");
        } else {
            return 1;
        }

        return 0;
    }

    guessLetter(letter) {

        if (this.lettersGuessed.includes(letter.toUpperCase())) {
            return -1;
        }

        if (this.lettersGuessed.length > 0) {
            this.lettersGuessed += ", ";
        }
        this.lettersGuessed += letter.toUpperCase();

        var FLAG = 0;
        for (var i = 0; i < this.word.length; i++) {
            if (this.word[i] == letter) {
                this.guesses = this.replaceAt(this.guesses, i, letter);
                FLAG += 1;
            }
        }

        if (FLAG == 0) {
            this.counter++;
        }

        return FLAG;
    }

    replaceAt(word, index, letter) {
        return word.substr(0, index) + letter + word.substr(index + 1);
    }

    startGame() {
        var num = Math.floor(Math.random() * 25);
        this.word = this.words[num];
        
        for (var i = 0; i < this.word.length; i++) {
            this.guesses += "-";
        }
    }

    endGame(msg) {
        msg.channel.send("Oh no! You lost! The word was: " + this.word);
    }

 }

 module.exports = {
    name: "hangman",
    description: "Lets the user play hangman against Blitzcrank",
    execute(msg, args, Discord) {
       const help = new Discord.MessageEmbed()
       .setColor(0xFFD700)
       .setTitle("Help - " + module.exports.name)
       .setDescription('Description:\n' +
                       module.exports.description +
                       "\n\n" +
                       'Syntax: \n\n' +                 //should have a set of syntax, example, and output for each possible
                       '".hangman start"\n' +                //configuration of arguments
                           'Example: ".hangman start"\n' + 
                           'Output: "Starting a game of hangman!"\n\n' + 
                       '".hangman guess {letter}"\n' +
                           'Example: ".hangman guess a"\n' +
                           'Output: "There is no A!"'
                       );
       // help message for if the user needs help with the command
       if (!args[1] || args.length > 3) {
           msg.channel.send(help);
           return;
       } else {
            // let the user enter the player queue for finding a match
            if (args[1] == "start") {
                if (!game) {
                    game = new HangmanGame();
                    game.startGame();
                    msg.channel.send("Starting a game of hangman! Try to guess the word!");
                    game.drawHangman(msg);
                } else {
                    msg.channel.send("There is already a game in progress!");
                }
            } else if (args[1] == "guess" && game) {
                if (args[2].length == 1 && args[2].match("^[a-zA-Z]$")) {
                    letter = args[2].toLowerCase();
                    var count = game.guessLetter(letter);

                    if(count > 0) {
                        msg.channel.send("There were " + count + " " + letter.toUpperCase() + "'s!");
                    } else if (count === 0) {
                        msg.channel.send("There were no " + letter.toUpperCase() + "'s!");
                    } else {
                        msg.channel.send("You have already guessed " + letter.toUpperCase() + "!");
                    }

                    if (game.drawHangman(msg) == 0) {
                        game = "";
                    }
                } else {
                    if (args[2].length !== 1) {
                        msg.channel.send("You must guess one letter at a time!");
                    } else {
                        msg.channel.send("You cannot guess numbers, only letters!");
                    }
                }
            } else {
                msg.channel.send(help);
            }
       }
    }
}