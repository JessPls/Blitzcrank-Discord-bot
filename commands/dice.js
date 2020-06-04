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
                        '"!dice <sides> <number of die>" - Rolls a dice with <sides> number of sides <number of die> times\n' +
                            'Example: !dice 20 3\n' +
                            'Output:  "You rolled 3 dice for a total of 29!"\n\n' +
                        '"!dice #d#" - Rolls a number of dice with a number of sides, formatted in dice notation\n' +
                            'Example: !dice 4d12\n' +
                            'Output:  "You rolled 4 dice for a total of 27!"\n\n' + 
                        'Other Information:\n' + 
                            'All options must be numbers using the 0-9 keys');
        if (args[1] && args[1].toLocaleLowerCase() == "help") {       
            msg.channel.send(diceHelp);}
        else {
            var sides = 6;
            var n = 0;
            var loops = 1;
            var limitRolls = 20;
            var limitSides = 360;
            if (args[2]){
                if(parseInt(args[2])) {
                    loops = parseInt(args[2]);}
                else {
                    msg.reply("Please make sure all options are numbers using the 0-9 keys")
                    return}
                }
            if (args[1]){
                if(parseInt(args[1])) {
                    sides = parseInt(args[1]);}
                else {
                    msg.reply("Please make sure all options are numbers using the 0-9 keys")
                    return}
            }
            if (args[1]) {     
                var stri = args[1].toLocaleLowerCase();         //modifies the data in case of #d# format
                var negOne = -1;
                if (stri.indexOf("d") !== negOne) {
                    var r = stri.indexOf("d");
                    r = r + 1;
                    var endlen = args[1].length;
                    endlen = endlen;
                    loops = parseInt(args[1]);
                    sides = parseInt(stri.slice(r,endlen));}}
            if (loops <= limitRolls && sides <= limitSides) {   // performs the rolling if the loops and numbers are not too high
                for (round = 0; round < loops; round++) {
                    var n = n + Math.floor(Math.random() * sides + 1);}
                if (loops === 1) {
                    msg.reply("You rolled a " + n + "!");}
                else {
                    msg.reply("You rolled " + loops + " dice for a total of " + n + "!");}
                }
            else if (sides <= limitSides) {           //error message for too many dice (to prevent program loops bogging down the bot)
                msg.reply("You rolled too many dice (limit = " + limitRolls + ")");}
            else {                                    //error message for dice having too many sides
                msg.reply("As the dice tumble onto the table, you look on in abject horror as they continually roll, " + 
                "as the imense number of sides are indecernable from eachother. You are quickly overwhelmed by the perpetually " + 
                "moving mass of \"dice\", eventually admitting defeat as they overthrow your household and build a new world " + 
                "from the rubble (Dice can only have " + limitSides + " sides.)")}
        }
    }
}