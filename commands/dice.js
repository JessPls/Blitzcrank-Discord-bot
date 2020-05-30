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
    description: "rolls a give number sided die",
    execute(msg, args, Discord) {
        var sides = 6;
        var n = 0;
        var loops = 1;
        var limit = 20;
        if (args[1] == "help" || args[1] == "Help") {
            const diceHelp = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("Help - Dice")
            .setDescription('Syntax: \n\n' + 
                            '"!dice" - Rolls a 6-sided dice and give output \n' +
                                'Example: !dice\n' +
                                'Output:  "You rolled a 4!"\n\n' +
                            '"!dice <sides>" - Rolls a dice with <sides> number of sides\n' + 
                                'Example: !dice 20\n' +
                                'Output:  "You rolled a 13!"\n\n' +
                            '"!dice <sides> <number of die>" - Rolls a dice with <sides> number of sides <number of die> times\n' +
                                'Example: !dice 20 3\n' +
                                'Output:  "You rolled 3 dice for a total of 29!"\n\n' +
                            '"!dice #d#" - Rolls a number of dice with a number of sides, formated in dice notation\n' +
                                'Example: !dice 4d12\n' +
                                'Output:  "You rolled 4 dice for a total of 27!"\n');
            msg.channel.send(diceHelp);
            return
        }
        if (args[2] && parseInt(args[2])) {
            loops = parseInt(args[2]);}
        if (args[1] && parseInt(args[1])) {
            sides = parseInt(args[1]);}
        var stri = args[1];
        if (args[1]) {
            if (stri.search("d") == 1 || stri.search("D") == 1) {
                loops = parseInt(stri.substr(0,1));
                sides = parseInt(stri.substr(2,1));}}
        if (loops <= limit) {
            for (round = 0; round < loops; round++) {
                var n = n + Math.floor(Math.random() * sides + 1);}
            if (loops === 1) {
                msg.reply("You rolled a " + n + "!");}
            else {
                msg.reply("You rolled " + loops + " dice for a total of " + n + "!");}}
        else {
            msg.reply("You rolled too many dice (limit = " + limit + ")");}
    }
}