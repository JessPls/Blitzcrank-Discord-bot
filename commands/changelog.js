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
        .setTitle("Changelog Version 1.1.2")
        .setDescription(" - Renamed !choice to !mcpoll (short for multiple choice poll) "
                        + "to make the command name less confusing\n"
                        + " - Changed !mcpoll syntax to be more intuitive. Now includes the question, and choices are separated by a | instead of 'or'\n"
                        + " - Fixed a bug in !mcpoll that would incorrectly display delimiter "
                        + "characters if they were used at the end of the command\n"
                        + " - Changed !pick to !choose to make the command name less confusing\n"
                        + " - Updated help options for both !mcpoll and !choose"
                        + " - Updated !commands to reflect these new syntax changes");
        
        msg.channel.send(changelog);
    }
}