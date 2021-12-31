/**
 * The .changelog command will print out the changelog from the most recent version,
 * so that the user does not have to visit the wiki to see what is new
 * 
 * v1.1.0 - modified description coding structure to match list style
 * v1.3.0 - Changed changelog string structure to multiline string
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "changelog",
    description: "displays the most recent changelog",
    execute(msg, args, Discord) {
        const changelog = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Changelog Version 1.3.0")
        .setDescription(
            ` - Added .hangman command to play Hangman against Blitzcrank, future implementation with players possible
             - Changed command prefix from ! to . to help with overlapping commands with other bots
              - Patched security vulnerabilities with outdated libraries`
        );
        
        msg.channel.send(changelog);
    }
}