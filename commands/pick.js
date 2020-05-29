/**
 * The pick command makes the bot choose between two options that are separated by "or"
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "pick",
    description: "Makes the bot pick between two options",
    execute(msg, args) {
        if (!args[1] || !args[3]) {
            msg.reply("Error! Please specify two things to pick between!");
        } else {
            var n = Math.floor(Math.random() * 2 + 1);
            const OR = "or";
            var choice = "I pick ";
            var choice1 = "";
            var choice2 = "";
            var firstOption = true;

            // use a for loop to get multi-word choices
            for (var i = 1; i < args.length; i++) {
                if (args[i] === OR) {
                    firstOption = false;
                } else if (firstOption) {
                    choice1 += args[i] + " ";
                } else {
                    choice2 += args[i] + " ";
                }
            }

            // interpret the choice
            if (n === 1) {
                choice += choice1;
            } else {
                choice += choice2;
            }

            msg.channel.send(choice);
        }
    }
}