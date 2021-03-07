/**
 * The poll command creates a simple yes or no poll for the users to react to
 * The basic poll command code was written by CodeLyon (https://www.youtube.com/watch?v=x4fqeYSWrDM&t=619s)
 * v1.1.0 - added user information at start of poll message, added !poll help command
 * 
 * @author CodeLyon
 * @author Jess Queen
 * @author Joel Kophazi
 */
module.exports = {
    name: "poll",
    description: "creates a simple yes/no poll",
    execute(msg, args, Discord) {
        const pollHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                                     //should have a set of syntax, example, and output for each possible
                        '"!poll <question>"\n' +                //configuration of arguments
                            'Example: "!poll Should trees be clasiffied as snails?"\n\n');
        if (args[1] && args[1].toLocaleLowerCase() == "help" || !args[1]) {
            msg.channel.send(pollHelp);
        } else {
            let question = args.slice(1).join(" ");
            msg.channel.send(msg.author.username + " started a poll!\n" + question).then(messageReaction  => {
                messageReaction.react("👍");
                messageReaction.react("👎");
            });
            msg.delete();
        }
    }
}