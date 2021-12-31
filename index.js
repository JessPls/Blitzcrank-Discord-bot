/**
 * This Discord bot will handle some simple message/reply sequences, allow the users
 * to create and vote in polls, and ask information about the bot
 * The framework for the Command Handler was written by CodeLyon (https://www.youtube.com/watch?v=8CwrJk0lwWQ&t=528s)
 * 
 * v1.0.2 - Added support for Capitalized commands
 * v1.1.0 - directed !help to !commands, added !meme and !image support, 
 *          added cheerio and request packets for !meme command, added default invalid command handler
 * v1.3.0 - Changed command prefix from ! to .
 * 
 * @author CodeLyon
 * @author Jess Queen
 * @author Joel Kophazi
 */
const Discord = require('discord.js');
const bot = new Discord.Client();
const cheerio = require('cheerio');
const request = require('request');

// prefix used for recognizing when the user is using a command
const PREFIX = '.';

// set up the command handler
const fs = require('fs');
bot.commands = new Discord.Collection();

// token used for activating the bot. Obsolete
// const TOKEN = fs.readFileSync('token.txt', 'utf8');

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
    if (msg.author != bot.user || msg.content.substring(0,1) === PREFIX) {
        // get the command name
        let args = msg.content.substring(PREFIX.length).split(" ");
        // interpret the commands
        switch(args[0].toLocaleLowerCase()) {
            // ping command for testing responsiveness
            case 'ping':
                bot.commands.get('ping').execute(msg, args, Discord);
                break;
            // info command for seeing bot version and author
            case 'info':
                bot.commands.get('info').execute(msg, args, Discord);
                break;
            // dice command for rolling a 20 sided dice
            case 'dice':
                bot.commands.get('dice').execute(msg, args, Discord);
                break;
            // command for generating the chance something happens
            case 'chance':
                bot.commands.get('chance').execute(msg, args, Discord);
                break;
            // command for using a magic 8 ball
            case '8ball':
                bot.commands.get('8ball').execute(msg, args, Discord);
                break;
            // command that generates a random, silly insult
            case 'insult':
                bot.commands.get('insult').execute(msg, args, Discord);
                break;
            // command for creating a poll with 2-5 options
            case 'mcpoll':
                bot.commands.get('mcpoll').execute(msg, args, Discord);
                break;
            // command for making the bot choose between 2 options
            case 'choose':
                bot.commands.get('choose').execute(msg, args, Discord);
                break;
            // command for creating a poll with yes/no options
            case 'poll':
                bot.commands.get('poll').execute(msg, args, Discord);
                break;
            // command for viewing the changelog for the latest version
            case 'changelog':
                bot.commands.get('changelog').execute(msg, args, Discord);
                break;
            // command for listing all of the commands in this bot
            case 'commands':
            case 'help':
                bot.commands.get('commands').execute(msg, args, Discord);
                break;
            // command for setting up bot messages on the server, will be removed/improved later
            case 'meme':
                bot.commands.get('meme').execute(msg, args, Discord, cheerio, request);
                break;
            // command that plays off of Among Us, tells the user whether something is suspicious or not
            // case 'sus':
            //     bot.commands.get('sus').execute(msg, args, Discord);
            //     break;
            // command for playing tic-tac-toe with other people
            case 'ttt':
                bot.commands.get('ttt').execute(msg, args, Discord);
                break;
            case 'hangman':
                bot.commands.get('hangman').execute(msg, args, Discord);
                break;
        }
    }
})

bot.login(process.env.TOKEN);
