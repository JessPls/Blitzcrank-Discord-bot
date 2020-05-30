/**
 * This Discord bot will handle some simple message/reply sequences, allow the users
 * to create and vote in polls, and ask information about the bot
 * The framework for the Command Handler was written by CodeLyon (https://www.youtube.com/watch?v=8CwrJk0lwWQ&t=528s)
 * 
 * v1.0.2 - Added support for Capitalized commands
 * 
 * @author CodeLyon
 * @author Jess Queen
 * @author Joel Kophazi
 */
const Discord = require('discord.js');
const bot = new Discord.Client();

// prefix used for recognizing when the user is using a command
const PREFIX = '!';

// set up the command handler
const fs = require('fs');
bot.commands = new Discord.Collection();

// token used for activating the bot. Please create your own token.txt file
const TOKEN = fs.readFileSync('token.txt', 'utf8');

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

// status message printed to the console when everything is working correctly
bot.on('ready', () =>{
    console.log("Bot is online!");
    bot.user.setActivity("your every move", { type: "WATCHING" });
})

// perform commands
bot.on('message', msg=>{
    
    // get the command name if the prefix is used
    let args = msg.content.substring(PREFIX.length).split(" ");

    // interpret the commands
    switch(args[0]) {
        // ping command for testing responsiveness
        case 'ping':
        case 'Ping':
            bot.commands.get('ping').execute(msg, args);
            break;
        // info command for seeing bot version and author
        case 'info':
        case 'Info':
            bot.commands.get('info').execute(msg, args, Discord);
            break;
        // dice command for rolling a 20 sided dice
        case 'dice':
        case 'Dice':
            bot.commands.get('dice').execute(msg, args, Discord);
            break;
        // command for generating the chance something happens
        case 'chance':
        case 'Chance':
            bot.commands.get('chance').execute(msg, args);
            break;
        // command for using a magic 8 ball
        case '8ball':
        case '8Ball':
            bot.commands.get('8ball').execute(msg, args);
            break;
        // command that generates a random, silly insult
        case 'insult':
        case 'Insult':
            bot.commands.get('insult').execute(msg, args);
            break;
        // command for choosing between two options
        case 'choice':
        case 'Choice':
            bot.commands.get('choice').execute(msg, args);
            break;
        // command for making the bot choose between 2 options
        case 'pick':
        case 'Pick':
            bot.commands.get('pick').execute(msg, args);
            break;
        // command for creating a poll with 2 options
        case 'poll':
        case 'Poll':
            bot.commands.get('poll').execute(msg, args, Discord);
            break;
        // command for viewing the changelog for the latest version
        case 'changelog':
        case 'Changelog':
            bot.commands.get('changelog').execute(msg, args, Discord);
            break;
        // command for listing all of the commands in this bot
        case 'commands':
        case 'Commands':
            bot.commands.get('commands').execute(msg, args, Discord);
            break;
        // command for setting up bot messages on the server, will be removed/improved later
        /**case 'setup':
            bot.commands.get('setup').execute(msg, args);
            break;*/
       }
})

bot.login(TOKEN);
