/**
 * The choice command creates a poll where users can choose between two options by
 * reacting to the message with "A" or "B" emojis
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "choice",
    description: "creates a poll where the user can choose between two options",
    execute(msg, args, Discord) {
        const choiceHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' + 
                        '"!choice <option 1> or <option 2>"\n' +
                        'Example: "!choice Hamburgers or Hotdogs"\n');
        if (!(args.includes("or") || args.includes("Or") || args.includes("oR") ||
            args.includes("OR")) || args[1].toLocaleLowerCase() == "help") {
            msg.channel.send(choiceHelp);
            return}
        else {
            const OR = "or";
            var choice1 = "";
            var choice2 = "";
            var firstOption = true;

            for (var i = 1; i < args.length; i++) {
                if (args[i].toLocaleLowerCase() === OR) {
                    firstOption = false;
                } else if (firstOption) {
                    choice1 += args[i] + " ";
                } else {
                    choice2 += args[i] + " ";
                }
            }

            // delete the initial message and replace it with the poll
            msg.channel.send(msg.author.username + " started a vote!\n" + choice1 + "(🅰️) or " + choice2 + "(🅱️)?").then(messageReaction => {
                messageReaction.react("🅰️");
                messageReaction.react("🅱️");
            });
            msg.delete();
        }
    }
}