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
        if (!args[1] || !args[2]) {
            msg.reply("Error! Please specify two things to choose between!");
        } else {
            const OR = "or";
            var choice1 = "";
            var choice2 = "";
            var firstOption = true;

            for (var i = 1; i < args.length; i++) {
                if (args[i] === OR) {
                    firstOption = false;
                } else if (firstOption) {
                    choice1 += args[i] + " ";
                } else {
                    choice2 += args[i] + " ";
                }
            }

            // delete the initial message and replace it with the poll
            msg.delete();
            msg.channel.send(choice1 + "(🅰️) or " + choice2 + "(🅱️)?").then(messageReaction => {
                messageReaction.react("🅰️");
                messageReaction.react("🅱️");
            });
        }
    }
}