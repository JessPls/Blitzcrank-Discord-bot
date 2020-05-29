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
    execute(msg, args, Discord) {
        if (!args[1]) {
            msg.reply("Error! Please specify a second argument!");
        } else if (args[1] === 'version') {
            msg.channel.send("Version " + version);
        } else if (args[1] === 'author') {
            msg.channel.send("This bot was written by Jess");
        } else if (args[1] === 'purpose') {
            msg.channel.send("Blitzcrank provides some QoL features such as polling and dice " +
                                "rolling, as well as some entertainment features.");
        } else if (args[1] === 'wiki') {
            const wiki = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("Blitzcrank Wiki")
            .setURL("https://github.com/Koopafan75/Blitzcrank-Discord-bot/wiki");

            msg.channel.send(wiki);
        } else {
            // invalid arguments
            msg.reply("Invalid arguments!");
        }
    }
}