/**
 * The ping command pings the bot, and is a very simple command
 * 
 * This command was used for testing if the bot was online, and was written
 * by CodeLyon (https://www.youtube.com/watch?v=8CwrJk0lwWQ&t=528s)
 * 
 * @author CodeLyon
 */
module.exports = {
    name: 'ping',
    description: "says pong!",
    execute(msg, args) {
        msg.reply('pong!');
    }
}