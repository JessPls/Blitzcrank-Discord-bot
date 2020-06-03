/**
 * The chance command randomly generates a percentage chance that an event will happen,
 * and informs the user of this chance
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "chance",
    description: "generates a random chance that something will happen",
    execute(msg, args, Discord) {
        if (args[1].toLocaleLowerCase() == "help") {
            const chance = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("Help - Chance")
            .setDescription('Syntax: \n\n' + 
                            '"!chance <scenario>\n"' +
                            'Example: "!chance the next update has no bugs"\n' +
                            'Output: "The chance the next update has no bugs is 4%"');
            msg.channel.send(chance);
            return}
        var response = "The chance ";
            for (var i = 1; i < args.length; i++) {
                // replace any I's with you's for grammar
                switch (args[i].toLocaleLowerCase()){
                    case "i":
                    case "me":
                        response += "you ";
                        break;
                    case "my":
                        response += "your ";
                        break;
                    case "mine":
                        response += "yours ";
                        break;
                    default:
                        response += args[i] + " ";
                }
            }
            var chance = Math.floor(Math.random() * 100 + 1);
            response += "is " + chance + "%";
            msg.reply(response);
    }
}