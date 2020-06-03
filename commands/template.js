/**
 * Basic description
 *
 * Version - changes
 * version - changes
 * version - changes
 * 
 * @author /*name*/
 
module.exports = {
    name: "commandName",
    description: "Command Description. Should detail in plain english what command does",
    execute(msg, args, Discord) {
        const /*commandName*/Help = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                                     //should have a set of syntax, example, and output for each possible
                        '"!command option option option"\n' +                //configuration of arguments
                            'Example: ""\n' + 
                            'Output:  ""\n\n' + 
                        'Other Information:\n' + 
                        '');
        if (/* other error handing arguments */true || args[1].toLocaleLowerCase() == "help") {
            msg.channel.send(/*commandName*/Help);}
        else {

            /*
             * Main body of code
             * 
             */

        }
    }
}