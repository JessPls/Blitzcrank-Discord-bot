/**
 * The dice command will roll a standard 6 sided die, or a die with as many sides as the user wants.
 * This depends on whether the user gives a numerical parameter or not
 * v1.0.2 - Now may roll multiple dice, up to a limit, accept the #d# format commonly used for DnD, and has a !dice Help responce
 * 
 * @author Jess Queen
 * @author Joel Kophazi
 */
module.exports = {
    name: "dice",
    description: "rolls a given number sided die a given amount of times",
    execute(msg, args, Discord) {
        const diceHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' + 
                        '"!dice" - Rolls a 6-sided dice and give output \n' +
                            'Example: !dice\n' +
                            'Output:  "You rolled a 4!"\n\n' +
                        '"!dice <sides>" - Rolls a dice with <sides> number of sides\n' + 
                            'Example: !dice 20\n' +
                            'Output:  "You rolled a 13!"\n\n' +
                        '"!dice <number of die> <sides>" - Rolls a dice with <sides> number of sides <number of die> times\n' +
                            'Example: !dice 20 3\n' +
                            'Output:  "You rolled 3 dice for a total of 29!"\n\n' +
                        '"!dice #d#" - Rolls a number of dice with a number of sides, formatted in dice notation\n' +
                            'Example: !dice 4d12\n' +
                            'Output:  "You rolled 4 dice for a total of 27!"\n\n' + 
                        'Other Information:\n' + 
                            'All options must be numbers using the 0-9 keys');
        if (args[1] && args[1].toLocaleLowerCase() == "help") {       
            msg.channel.send(diceHelp);
        } else {
            var sides = 6;
            var n = 0;
            var indivRolls = "";
            var rolls = 1;
            var min = Number.MAX_SAFE_INTEGER;
            var max = Number.MIN_SAFE_INTEGER
            const limitRolls = 20;
            const limitSides = 360;
            if (args[2]) {
                if (parseInt(args[2])) {
                    sides = parseInt(args[2]);
                } else {
                    msg.reply("please make sure all options are numbers using the 0-9 keys");
                    return;
                }
            }

            if (args[1]) {
                if(parseInt(args[1])) {
                    rolls = parseInt(args[1]);

                    //modifies the data in case of #d# format
                    var str = args[1].toLocaleLowerCase();
                    if (str.indexOf("d") !== -1) {
                        var r = str.indexOf("d");
                        var endlen = args[1].length;
                        rolls = parseInt(str.substring(0,r));
                        sides = parseInt(str.substring(r + 1,endlen));
                    }
                } else {
                    msg.reply("please make sure all options are numbers using the 0-9 keys");
                    return;
                }
            }

            if (rolls <= limitRolls && sides <= limitSides) {   // performs the rolling if the loops and numbers are not too high
                for (var i = 0; i < rolls; i++) {
                    var val = Math.floor(Math.random() * sides + 1);
                    if (val > max) { max = val; } // set the new max value
                    if (val < min) { min = val; } // set the new min value
                    n += val;
                    indivRolls += " " + val;
                    if (i != rolls - 1) { indivRolls += " +"; }
                }

                // display the result to the user
                if (rolls === 1) {
                    msg.reply("you rolled a " + n + "!");
                } else {
                    msg.reply("rolling " + rolls + "d" + sides + ":" + indivRolls + "\nTotal: " + n +
                                "\t\tMax roll: " + max + "\t\tMin roll: " + min);
                }
            } else if (rolls > limitRolls) {    // error message for too many dice (to prevent program loops bogging down the bot)
                msg.reply("you rolled too many dice (limit = " + limitRolls + ")");
            } else {    // error message for dice having too many sides
                msg.reply("your dice have too many sides (Dice can only have up to " + limitSides + " sides)");
            }
        }
    }
}