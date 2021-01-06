/**
 * The sus command will tell the user whether something is "suspicious" or not,
 * based on the popular game Among Us. There is a 2 in 10 chance that something or
 * someone is sus, with different reasonings for each number
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "sus",
    description: "Returns whether something is suspicious or not",
    execute(msg, args, Discord) {
        const help = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +           //should have a set of syntax, example, and output for each possible
                        '"!sus <thing>"\n' +      //configuration of arguments
                            'Example: "!sus Jess"\n' + 
                            'Output:  "Jess is sus! I saw them vent!"\n\n');
        if (args[1] && args[1].toLocaleLowerCase() == "help" || !args[1]) {
            msg.channel.send(help);
        } else {
            var chance = Math.floor(Math.random() * 10);
            var sus = "";

            // add all of the text into the beginning of the response
            for (var i = 1; i < args.length; i++) {
                sus += args[i] + " ";
            }
            // fix any upper/lowercase issues for grammar
            sus = sus.charAt(0).toUpperCase() + sus.slice(1);
            switch(chance) {
                case 0:
                    sus += "is sus! I saw them vent!";
                    break;
                case 1:
                    sus += "is sus! They killed red in Electrical!";
                    break;
                case 2:
                    sus += "is not sus! I saw them do trash!";
                    break;
                case 3:
                    sus += "is not sus! They did reactor with me!";
                    break;
                case 4:
                    sus += "is not sus! They were with me and green the whole time!";
                    break;
                case 5:
                    sus += "is not sus! They exposed the last imposter!";
                    break;
                case 6:
                    sus += "is not sus! They helped me fix O2!";
                    break;
                case 7:
                    sus += "is not sus! I saw them do medbay scan!";
                    break;
                case 8:
                    sus += "is not sus! They were doing circles in the cafeteria with me all round!";
                    break;
                case 9:
                    sus += "is not sus! I saw them do weapons!";
                    break;
            }

            msg.channel.send(sus);
        }
    }
}