/**
 * The info command allows the user to see many different things about the bot, such as the
 * current version or the author of the bot
 * 
 * @author Jess Queen
 */

// the bot version
var version = "1.0.1";

module.exports = {
    name: 'info',
    description: 'gives information about the bot',
    execute(msg, args) {
        if (!args[1]) {
            msg.reply("Error! Please specify a second argument!");
        } else if (args[1] === 'version') {
            msg.channel.send("Version " + version);
        } else if (args[1] === 'author') {
            msg.channel.send("This bot was written by Jess");
        } else {
            // invalid arguments
            msg.reply("Invalid arguments!");
        }
    }
}