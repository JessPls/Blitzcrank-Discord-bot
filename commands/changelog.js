/**
 * The !changelog command will print out the changelog from the most recent version,
 * so that the user does not have to visit the wiki to see what is new
 * v1.1.0 - modified description codeing structure to match list style
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "changelog",
    description: "displays the most recent changelog",
    execute(msg, args, Discord) {
        const changelog = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Changelog Version 1.2.0")
        .setDescription(" - Added the !sus command, based off of Among Us. Blitzcrank will tell you" +
                        " whether something is sus or not, with reasoning\n" +
                        " - Added the !ttt command, which allows users to play Tic-tac-toe against" +
                        " each other in Discord! Sub-commands include !ttt join, !ttt leave, !ttt <num>\n" +
                        " - Began implementing an organization structure that would allow for other Discord" +
                        " games to be possible in the future\n" +
                        " - Bug fixes");
        
        msg.channel.send(changelog);
    }
}