/**
 * The chance command randomly generates a percentage chance that an event will happen,
 * and informs the user of this chance
 * v1.1.0 - added !chance help command, changed grammer correction to switch/case
 * 
 * @author Jess Queen
 * @author Joel Kophazi
 */
module.exports = {
    name: "chance",
    description: "generates a random chance that something will happen",
    execute(msg, args, Discord) {
        const Help = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                                     //should have a set of syntax, example, and output for each possible
                        '"!chance <scenario>"\n' +                //configuration of arguments
                            'Example: "!chance the next update has no bugs"\n' + 
                            'Output:  "The chance the next update has no bugs is 4%"\n\n');
        if (args[1] && args[1].toLocaleLowerCase() == "help" || !args[1]) {
            msg.channel.send(Help);
        } else {
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
}