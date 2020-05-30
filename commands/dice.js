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
        var n = 0;
        var loops = 1;
        var limit = 20;
        if (args[1] && parseInt(args[1])) {
            sides = parseInt(args[1]);
        }
        if (args[2] && parseInt(args[2])) {
            loops = parseInt(args[2]);
        }
        if (loops <= limit) {
            for (round = 0; round < loops; round++) {
                var n = n + Math.floor(Math.random() * sides + 1);
            }
            if (loops === 1) {
                msg.reply("you rolled a " + n + "!");
            }
            else {
                msg.reply("you rolled " + loops + " dice for a total of " + n + "!");
            }
        }
        else {
            msg.reply("you rolled too many dice (limit = " + limit + ")");
        }
    }
}