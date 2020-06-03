/**
 * The !changelog command will print out the changelog from the most recent version,
 * so that the user does not have to visit the wiki to see what is new
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "changelog",
    description: "displays the most recent changelog",
    execute(msg, args, Discord) {
        const changelog = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Changelog Version 1.0.2")
        .setDescription(" - Changed the !dice command to allow multiple dice to be rolled at " +
                        "once\n - Changed the !pick command to be able to pick between " +
                        "more than 2 options\n - Added help options for all !commands" +
                        ' that can be accessed with "!<command> help\n - Added fallback for ' +
                        "invalid commands\n - Updated the !commands command to be more " +
                        " descriptive\n - Added an easter egg (Shhh it's a secret!)\n" +
                        " - Started prepping for v1.1.0");
        
        msg.channel.send(changelog);
    }
}