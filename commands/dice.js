/**
 * The dice command will roll a standard 6 sided die, or a die with as many sides as the user wants.
 * This depends on whether the user gives a numerical parameter or not
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "dice",
    description: "rolls a give number sided die",
    execute(msg, args) {
        var sides = 6;
        if (args[1] && parseInt(args[1])) {
            sides = parseInt(args[1]);
        }
        var n = Math.floor(Math.random() * sides + 1);
        msg.reply("You rolled a " + n + "!");
    }
}