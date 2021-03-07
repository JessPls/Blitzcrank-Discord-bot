/**
 * The pick command makes the bot choose between two options that are separated by "or"
 * 
 * v1.0.2 - Added the ability to pick between more than 2 options, removed case sensitivity
 * v1.1.0 - added !pick help command
 * v1.1.2 - changed "pick" to "choose"
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "choose",
    description: "Makes the bot choose between 2+ options",
    execute(msg, args, Discord) {
        // create a help embed if needed
        const chooseHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - choose")
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                                     //should have a set of syntax, example, and output for each possible
                        '"!choose <choice1> or <choice2> or ..."\n' +                //configuration of arguments
                            'Example: "!choose this or that or these or those"\n' + 
                            'Output:  "I choose these!"\n\n');
        // invalid command or help command
        if (!(args.includes("or") || args.includes("Or") || args.includes("oR") ||
            args.includes("OR")) || (args.length >= 2 && args[1].toLocaleLowerCase() == "help")) {
            msg.channel.send(chooseHelp);
        } else {
            const OR = "or";
            var choice = "I choose ";
            var curChoice = "";
            var numChoices = 0;
            var options = [];

            // use a for loop to get multi-word choices
            for (var i = 1; i < args.length; i++) {
                if (args[i].toLocaleLowerCase() === OR) {
                    options.push(curChoice);
                    curChoice = "";
                    numChoices++;
                    // make sure there is something after the "or"
                    if (!args[i + 1]) {
                        msg.reply(pickHelp);
                        return;
                    }
                } else {
                    curChoice += args[i] + " ";
                }
            }
            // add the last option
            options.push(curChoice);
            numChoices++;
            
            var n = Math.floor(Math.random() * numChoices);

            // interpret the choice
            choice += options[n];

            msg.channel.send(choice.trimRight() + "!");
        }
    }
}