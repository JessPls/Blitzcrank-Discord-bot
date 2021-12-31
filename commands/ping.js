/**
 * The ping command pings the bot, and is a very simple command
 * This command was used for testing if the bot was online, and was written
 * by CodeLyon (https://www.youtube.com/watch?v=8CwrJk0lwWQ&t=528s)
 * v1.1.0 - added !ping help command, overall a very useless addition, but made for uniformity
 * 
 * @author CodeLyon
 */
module.exports = {
    name: 'ping',
    description: "says pong!",
    execute(msg, args, Discord) {
        const pingHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +              //should have a set of syntax, example, and output for each possible
                        '".ping"\n' +                //configuration of arguments
                            'Example: ".ping"\n' + 
                            'Output:  "@Jess, Pong!"\n\n' + 
                        'Other Information:\n');
        if (args[1] && args[1].toLocaleLowerCase() == "help") {
            msg.channel.send(pingHelp);
            }
        else {
        msg.reply('pong!');}
    }
}