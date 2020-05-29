/**
 * The poll command creates a simple yes or no poll for the users to react to
 * 
 * The basic poll command code was written by CodeLyon (https://www.youtube.com/watch?v=x4fqeYSWrDM&t=619s)
 * 
 * @author CodeLyon
 * @author Jess Queen
 */
module.exports = {
    name: "poll",
    description: "creates a simple yes/no poll",
    execute(msg, args, Discord) {
        const Embed = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("How to start a poll")
        .setDescription("Use !poll <question> to start a simple yes/no poll!");

        if (!args[1]) {
            msg.channel.send(Embed);
        } else {
            let question = args.slice(1).join(" ");
            msg.channel.send(question).then(messageReaction  => {
                messageReaction.react("👍");
                messageReaction.react("👎");
            });
        }
    }
}