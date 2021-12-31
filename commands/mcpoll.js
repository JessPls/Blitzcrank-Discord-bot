/**
 * The choice command creates a poll where users can choose between two options by
 * reacting to the message with "A" or "B" emojis
 * v1.1.0 - Added user info at the start of the vote, added !choice help command
 * v1.1.2 - Renamed "choice" to "mcpoll" (short for multiple choice poll)
 *        - Updated syntax of command to be more user friendly
 * 
 * @author Jess Queen
 * @author Joel Kophazi
 */
module.exports = {
    name: "mcpoll",
    description: "creates a reaction poll with 2-5 options",
    execute(msg, args, Discord) {
        const mcpollHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' + 
                        '".mcpoll <question> | <option 1> | <option 2> | ..."\n' +
                        'Example: ".mcpoll Which is better: | Hamburgers | Hotdogs"\n');
        if (!args.includes("|") || args[1].toLocaleLowerCase() == "help") {
            msg.channel.send(mcpollHelp);
            return;
        } else {
            const LINE = "|";
            var question = "";
            var choice1 = "";
            var choice2 = "";
            var choice3 = "";
            var choice4 = "";
            var choice5 = "";
            var numOptions = 0;

            for (var i = 1; i < args.length; i++) {
                if (args[i].toLocaleLowerCase() === LINE && i != args.length - 1) {
                    numOptions += 1;
                } else if (args[i].toLocaleLowerCase() !== LINE) {
                    switch (numOptions) {
                        case 0:
                            question += args[i] + " ";
                            break;
                        case 1:
                            choice1 += args[i] + " ";
                            break;
                        case 2:
                            choice2 += args[i] + " ";
                            break;
                        case 3:
                            choice3 += args[i] + " ";
                            break;
                        case 4:
                            choice4 += args[i] + " ";
                            break;
                        case 5:
                            choice5 += args[i]  + " ";
                            break;
                        case 6:
                            msg.reply(" you can only have a maximum of 5 options!");
                            return;
                    }
                }
            }

            // modify the output string to be the same as the number of options
            var outputMsg = "";
            if (numOptions < 2) {
                msg.reply(" you must have at least 2 options!");
                return;
            } else {
                outputMsg += msg.author.username + " has started a multiple choice poll!\n\n" + question
                            + "\n1️⃣ - " + choice1 + "\n2️⃣ - " + choice2;

                // if statements for additional choices
                if (numOptions >= 3) {
                    outputMsg += "\n3️⃣ - " + choice3;
                }
                if (numOptions >= 4) {
                    outputMsg += "\n4️⃣ - " + choice4;
                }
                if (numOptions >= 5) {
                    outputMsg += "\n5️⃣ - " + choice5;
                }
            }

            // delete the initial message and replace it with the poll
            msg.channel.send(outputMsg).then(messageReaction => {
                messageReaction.react("1️⃣");
                messageReaction.react("2️⃣");

                // additional reactions if needed
                if (numOptions >= 3) {
                    messageReaction.react("3️⃣");
                }
                if (numOptions >= 4) {
                    messageReaction.react("4️⃣");
                }
                if (numOptions >= 5) {
                    messageReaction.react("5️⃣");
                }
            });
            msg.delete();
        }
    }
}