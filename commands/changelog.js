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
        .setTitle("Changelog Version 1.1.1")
        .setDescription(" - Updated bot for hosting on the cloud so Blitzcrank is available more often!\n" +
                         " - Improved bot info security\n" +
                         " - Updated README installation file to accurately reflect changes");
        
        msg.channel.send(changelog);
    }
}