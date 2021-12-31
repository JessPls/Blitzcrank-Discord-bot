/**
 * The tictactoe command does a plethera of things, from putting the user into a queue
 * to find a tic-tac-toe game, to letting them makes moves to play the game
 * 
 * @author Jess Queen
 */

 // variable for keeping track of who wants to play
 var playerQueue = [];

 // variable for the current game being played, if any
 var game = "";

 /**
 * The TicTacToeGame class will represent a game of Tic-tac-toe between two players,
 * and will keep track of the board in addition to the player's turns
 * 
 * @author Jess Queen
 */
class TicTacToeGame {

    // keep track of the board to output
    board = "1️⃣   |   2️⃣   |   3️⃣\n" +
            "---------------------\n" +
            "4️⃣   |   5️⃣   |   6️⃣\n" +
            "---------------------\n" +
            "7️⃣   |   8️⃣   |   9️⃣\n";

    // keep track of the valid moves available
    openSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // keep track of the player whose turn it is
    currentTurn = "";

    // constant for winning number combos for tic-tac-toe
    winningSpaces = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];

    // create a new TicTacToeGame object
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.player1.assignSymbol("❌");
        this.player2.assignSymbol("⭕");

        this.currentTurn = this.player1;
    }

    // try to make a move on the board, and return true/false if it was valid/invalid
    makeMove(player, spaceId) {
        if (!this.openSpaces.includes(spaceId)) {
            return false;
        }
        var id = "";
        switch (spaceId) {
            case 1:
                id = "1️⃣";
                break;
            case 2:
                id = "2️⃣";
                break;
            case 3:
                id = "3️⃣";
                break;
            case 4:
                id = "4️⃣";
                break;
            case 5:
                id = "5️⃣";
                break;
            case 6:
                id = "6️⃣";
                break;
            case 7:
                id = "7️⃣";
                break;
            case 8:
                id = "8️⃣";
                break;
            case 9:
                id = "9️⃣";
                break;
        }
        this.board = this.board.replace(id, player.getSymbol());
        var idx = this.openSpaces.indexOf(spaceId);
        this.openSpaces.splice(idx, 1);
        //console.log(this.openSpaces);
        player.addTakenSpace(spaceId);
        return true;
    }

    // check to see if the current player won the game
    checkForWin(player) {
        var s = player.getTakenSpaces();

        for (var i = 0; i < this.winningSpaces.length; i++) {
            var s1 = this.winningSpaces[i][0];
            var s2 = this.winningSpaces[i][1];
            var s3 = this.winningSpaces[i][2];
            if (s.includes(s1) && s.includes(s2) && s.includes(s3)) {
                return true;
            }
        }

        if (player == this.player1) {
            this.currentTurn = this.player2;
        } else {
            this.currentTurn = this.player1;
        }

        return false;
    }

    // return the board to print out to the users
    getBoard() {
        return this.board;
    }
}

/**
 * The player class will be responsible for keeping track of
 * Discord users who play games with the Discord bot. Initially
 * this is just for tic-tac-toe
 * 
 * @author Jess Queen
 */
class Player {
    // Create a new Player object, with the name of the player and an empty list of taken spaces
    constructor(name) {
        this.name = name;
        this.takenSpaces = [];
    }

    // get the name of the player
    getName() {
        return this.name;
    }

    // assign an X or an O to the player
    assignSymbol(symbol) {
        this.symbol = symbol;
    }

    // get the symbol that the user is using for the game
    getSymbol() {
        return this.symbol;
    }

    // add a space ID for the tic-tac-toe board to the array of spaces the player has
    addTakenSpace(spaceId) {
        this.takenSpaces.push(spaceId);
    }

    // return the array of spaces that the player has taken
    getTakenSpaces() {
        return this.takenSpaces;
    }
}

 module.exports = {
     name: "ttt",
     description: "Lets the user play tic-tac-toe with another user",
     execute(msg, args, Discord) {
        const help = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                 //should have a set of syntax, example, and output for each possible
                        '".ttt join"\n' +                //configuration of arguments
                            'Example: ".ttt join"\n' + 
                            'Output: "Jess wants to play Tic-Tac-Toe! Waiting for a second player..."\n\n' + 
                        '".ttt leave"\n' +
                            'Example: ".ttt leave"\n' +
                            'Output: "Removed Jess from the player queue"\n\n' +
                        '".ttt <number 1-9>"\n' +
                            'Example: ".ttt 8"\n' +
                            'Output: "Jess placed an X at spot 8!"\n\n'
                        );
        // help message for if the user needs help with the command
        if (!args[1]) {
            msg.channel.send(help);
            return;
        } else {
            // let the user enter the player queue for finding a match
            if (args[1] == "join") {
                // don't let a player join if a game is currently in progress
                if (game != "") {
                    msg.reply("Please wait until the current game is over!");
                }

                // add player to the queue if they are not already in it
                if (playerQueue.length == 1) {
                    var p1 = playerQueue.pop();
                    if (p1.getName() == msg.author.toString()) {
                        msg.channel.send("You are already waiting for a game! " + p1.getName());
                        return;
                    }
                    playerQueue.push(p1);
                }
                const p = new Player(msg.author.toString());
                playerQueue.push(p);
                
                // when 2 players are in the queue, start a game!
                if (playerQueue.length >= 2) {
                    game = new TicTacToeGame(playerQueue.pop(), playerQueue.pop());
                    msg.channel.send("A new game has started between " + game.player1.getName() + " and " + game.player2.getName());
                    msg.channel.send(game.getBoard() + "\n" + game.player1.getName() + ", use !ttt <1-9> to place a ❌ on the board");
                } else {
                    msg.channel.send(p.getName() + " wants to play Tic-Tac-Toe! Waiting for a second player...")
                }
            // the user wants to remove themselves from the queue
            } else if (args[1] == "leave") {
                if (playerQueue.length == 1) {
                    var p1 = playerQueue.pop();

                    // remove the player if they are in the queue
                    if (p1.getName() == msg.author.toString()) {
                        msg.channel.send("Removed " + p1.getName() + " from the player queue");
                    } else {
                        playerQueue.push(p1);
                        msg.reply("you are not in the player queue")
                    }
                // if the player queue is empty, display a confirmation message
                } else {
                    msg.reply("you are not in the player queue")
                }
            // someone has tried to make a move
            } else if (parseInt(args[1]) && game != "") {
                var spaceId = parseInt(args[1]);

                // check to make sure that it is a potentially valid move, by the current player
                if (msg.author.toString() == game.currentTurn.getName() && spaceId >= 1 && spaceId <= 9) {
                    var currentPlayer = game.currentTurn;
                    if (!game.makeMove(currentPlayer, spaceId)) {
                        // don't let the game continue with an invalid move
                        msg.reply("that space is taken! Please pick a valid space!");
                        return;
                    }
                    msg.channel.send(game.getBoard());

                    // check to see if the current player has won the game
                    if (game.checkForWin(currentPlayer)) {
                        msg.channel.send(currentPlayer.getName() + " won the game!");
                        game = "";
                    } else {
                        // check to see if the game is a draw, or if it continues
                        if (game.openSpaces.length == 0) {
                            msg.channel.send("Cats! The game ended in a draw! Good game " + 
                                                game.player1.getName() + " and " + game.player2.getName());
                        } else {
                            msg.channel.send(game.currentTurn.getName() + ", use !ttt <1-9> to place a " +
                                            game.currentTurn.getSymbol() + " on the board");
                        }
                    }
                // display an error message if someone other than the current player tried to make a move
                } else if (msg.author.toString() != game.currentTurn.getName()) {
                    msg.reply("it is not your turn!");
                // display an error message for invalid moves
                } else {
                    msg.reply("invalid move! Please pick a number between 1-9 instead. " +
                    "Use !ttt <1-9> to place a " + game.currentTurn.getSymbol() + " on the board");
                }
            // return an error message for players who entered an incorrect command
            } else {
                msg.channel.send(help);
                return;
            }
        }
    }
 }