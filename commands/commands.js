/**
 * The commands command will list all of the commands in the bot
 * 
 * v1.0.2 - Updated dice command description
 * v1.1.0 - added !meme, modified !pick to reflect multiple choices
 * v1.1.2 - changed !pick to !choose, !choice to !mcpoll
 * 
 * @author Jess Queen
 * @author Joel Kophazi
 */
module.exports = {
    name: "commands",
    description: "lists all of the commands that the user can perform",
    execute(msg, args, Discord) {
        var listOfCommands = //"List of Commands:\n" + 
                                "!ping - Pings the bot\n" +
                                "!info <version,author,purpose,wiki> - See information about this bot\n" +
                                "!dice {number} {sides} - Rolls <number> die with <sides> number of sides\n" +
                                "!chance <thing> - Tells you the chance that <thing> will happen with 100% accuracy\n" +
                                "!8ball {question} - Give you a magic 8 ball response to <question>\n" +
                                "!insult <person> - Insults <person> with a random insult\n" +
                                "!choose <thing1> or <thing2> or ... - Make the bot choose between two or more things\n" +
                                "!poll <question> - Generate a simple yes/no poll\n" +
                                "!mcpoll <question> | <thing1> | <thing2> | ... - Generate a multiple choice poll between 2-5 options\n" +
                                "!meme - Gives you a random meme;\n" + 
                                "!commands - List all valid commands this bot offers\n\n" +
                                "{text} - optional\n<text> - required"
            const commands = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("List of Commands")
            .setDescription(listOfCommands);

            msg.channel.send(commands);
    }
}