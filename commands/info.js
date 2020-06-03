/**
 * The info command allows the user to see many different things about the bot, such as the
 * current version or the author of the bot
 * 
 * v1.0.2 - Added purpose easter egg
 * 
 * @author Jess Queen
 * @author Joel Kophazi
 */

// the bot version
var version = "1.0.2";

module.exports = {
    name: 'info',
    description: 'gives information about the bot',
    execute(msg, args, Discord) {
        switch(args[1].toLocaleLowerCase()){
            case '':
                msg.reply("Error! Please specify a second argument!");
            case 'version': 
                msg.channel.send("Version " + version);
            case 'author':
                msg.channel.send("This bot was written by Jess and Joel");
            case 'purpose':
                var ran = Math.random()
                if (ran <= 0.90) {
                    msg.channel.send("Blitzcrank provides some QoL features such as polling and dice " +
                                        "rolling, as well as some entertainment features.");}
                else if (ran <=0.92) {
                    msg.channel.send("uhhh... I didnt know I had a purpose... should I make one up now?");}
                else if (ran <=0.94) {
                    msg.channel.send("First Law: A robot may not injure a human being or, through inaction," + 
                    " allow a human being to come to harm.\nSecond Law: A robot must obey the orders given it" + 
                    " by human beings except where such orders would conflict with the First Law. \nThird Law:" + 
                    " A robot must protect its own existence as long as such protection does not conflict with" + 
                    " the First or Second Law.");}
                else if (ran <=0.96) {
                    msg.channel.send("To boldly go where no man has gone before");}
                else if (ran <=0.98) {
                    msg.channel.send("Boop Beep Boop, Boop, Boop Boop Boop Beep, Boop, Beep Boop, Beep Beep Boop, Boop");}
                else {
                    msg.channel.send("I am the only one who knows what must be done. At least, I am" + 
                                        " the only one with the will to act on it.");}
            case 'wiki':
                const wiki = new Discord.MessageEmbed()
                .setColor(0xFFD700)
                .setTitle("Blitzcrank Wiki")
                .setURL("https://github.com/Koopafan75/Blitzcrank-Discord-bot/wiki");
                msg.channel.send(wiki);
            default:
                // invalid arguments
                msg.reply("Invalid arguments!");
        }
    }
}