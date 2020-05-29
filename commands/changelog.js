/**
 * The !changelog command will print out the changelog from the most recent version,
 * so that the user does not have to visit the wiki to see what is new
 */
module.exports = {
    name: "changelog",
    description: "displays the most recent changelog",
    execute(msg, args, Discord) {
        const changelog = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Changelog Version 1.0.1")
        .setDescription(" - Changed the organization of the bot to use a Command Handler instead" +
                        " of a super long index.js file\n - Added the !info purpose and !info " +
                        "wiki commands\n - Fixed security concern with the bot token\n" +
                        " - Changed the !dice command to accept a parameter for the number " +
                        "of sides on the die");
        
        msg.channel.send(changelog);
    }
}