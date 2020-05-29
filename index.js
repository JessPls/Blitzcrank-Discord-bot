/**
 * This Discord bot will handle some simple message/reply sequences, allow the users
 * to create and vote in polls, and ask information about the bot
 * 
 * The framework for the Command Handler was written by CodeLyon (https://www.youtube.com/watch?v=8CwrJk0lwWQ&t=528s)
 * 
 * @author CodeLyon
 * @author Jess Queen
 */
const Discord = require('discord.js');
const bot = new Discord.Client();

// token used for activating the bot
const TOKEN = 'NzE1NjI3MzYzOTYyMDYwODEw.XtCPRQ.AKuLle4dV8_qb3dHA1ppWMm5Z5k';

// prefix used for recognizing when the user is using a command
const PREFIX = '!';

// set up the command handler
const fs = require('fs');
bot.commands = new Discord.Collection();

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
            bot.commands.get('ping').execute(msg, args);
            break;
        // info command for seeing bot version and author
        case 'info':
            bot.commands.get('info').execute(msg, args);
            break;
        // dice command for rolling a 20 sided dice
        case 'dice':
            bot.commands.get('dice').execute(msg, args);
            break;
        // command for generating the chance something happens
        case 'chance':
            bot.commands.get('chance').execute(msg, args);
            break;
        // command for using a magic 8 ball
        case '8ball':
            bot.commands.get('8ball').execute(msg, args);
            break;
        // command that generates a random, silly insult
        case 'insult':
            bot.commands.get('insult').execute(msg, args);
            break;
        // command for choosing between two options
        case 'choice':
            bot.commands.get('choice').execute(msg, args);
            break;
        // command for making the bot choose between 2 options
        case 'pick':
            bot.commands.get('pick').execute(msg, args);
            break;
        // command for creating a poll with 2 options
        case 'poll':
            bot.commands.get('poll').execute(msg, args, Discord);
            break;
        // command for listing all of the commands in this bot
        case 'commands':
            bot.commands.get('commands').execute(msg, args, Discord);
            break;
       }
})

bot.login(TOKEN);