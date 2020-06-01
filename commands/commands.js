/**
 * The commands command will list all of the commands in the bot
 * v1.0.2 - Updated dice command description
 * @author Jess Queen
 */
module.exports = {
    name: "commands",
    description: "lists all of the commands that the user can perform",
    execute(msg, args, Discord) {
        var listOfCommands = //"List of Commands:\n" + 
                                "!ping - Pings the bot\n" +
                                "!info <version,author,purpose,wiki> - See information about this bot\n" +
                                "!dice {number} {amount} - Rolls a die with <number> of sides <amount> times\n" +
                                "!chance <thing> - Tells you the chance that <thing> will happen with 100% accuracy\n" +
                                "!8ball {question} - Give you a magic 8 ball response to <question>\n" +
                                "!insult <person> - Insults <person> with a random insult\n" +
                                "!choice <thing1> or <thing2> - Generate a choice between two options\n" +
                                "!pick <thing1> or <thing2> or ... - Make the bot pick between two or more things\n" +
                                "!poll <question> - Generate a simple yes/no poll\n" +
                                "!commands - List all valid commands this bot offers\n\n" +
                                "{text} - optional"
            const commands = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("List of Commands")
            .setDescription(listOfCommands);

            msg.channel.send(commands);
    }
}