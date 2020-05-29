/**
 * This Discord bot will handle some simple message/reply sequences, allow the users
 * to create and vote in polls, and ask information about the bot
 * 
 * @author Jess Queen
 */
const Discord = require('discord.js');
const bot = new Discord.Client();

// the bot version
var version = "1.0.0";

// token used for activating the bot
const TOKEN = 'Your token here';

// prefix used for recognizing when the user is using a command
const PREFIX = '!';

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
            msg.reply('pong!');
            break;
        // info command for seeing bot version and author
        case 'info':
            if (!args[1]) {
                msg.reply("Error! Please specify a second argument!");
            } else if (args[1] === 'version') {
                msg.channel.send("Version " + version);
            } else if (args[1] === 'author') {
                msg.channel.send("This bot was written by Jess");
            } else {
                // invalid arguments
                msg.reply("Invalid arguments!");
            }
            break;
        // dice command for rolling a 20 sided dice
        case 'dice':
            var n = Math.floor(Math.random() * 20 + 1);
            msg.reply("You rolled a " + n + "!");
            break;
        // random number generator command
        case 'random':
            if (!args[1]) {
                msg.reply("Error! Please specify a second argument!");
            } else if (!parseInt(args[1])) {
                msg.reply("Error! The second argument should be an integer!");
            } else {
                var num = Math.floor(Math.random() * parseInt(args[1]) + 1);
                msg.channel.send("Generated a number between 1 and " + args[1] + ": " + num);
            }
            break;
        // command for generating the chance something happens
        case 'chance':
            var response = "The chance that ";
            for (var i = 1; i < args.length; i++) {
                // replace any I's with you's for grammar
                if (args[i] === "I" || args[i] === "me") {
                    response += "you ";
                } else if (args[i] === "my") {
                    response += "your ";
                } else {
                    response += args[i] + " ";
                }
            }
            var chance = Math.floor(Math.random() * 100 + 1);
            response += "is " + chance + "%";
            msg.reply(response);
            break;
        // command for using a magic 8 ball
        case '8ball':
            var response = "";
            var num = Math.floor(Math.random() * 20 + 1);

            // get the appropriate magic 8 ball response
            if (num == 1) {
                response = "as I see it, yes.";
            } else if (num == 2) {
                response = "ask again later.";
            } else if (num == 3) {
                response = "aetter not tell you now.";
            } else if (num == 4) {
                response = "cannot predict now";
            } else if (num == 5) {
                response = "concentrate and ask again.";
            } else if (num == 6) {
                response = "don't count on it.";
            } else if (num == 7) {
                response = "it is certain.";
            } else if (num == 8) {
                response = "it is decidedly so.";
            } else if (num == 9) {
                response = "most likely.";
            } else if (num == 10) {
                response = "my reply is no.";
            } else if (num == 11) {
                response = "my sources say no.";
            } else if (num == 12) {
                response = "outlook not so good.";
            } else if (num == 13) {
                response = "outlook good.";
            } else if (num == 14) {
                response = "reply hazy, try again.";
            } else if (num == 15) {
                response = "signs point to yes.";
            } else if (num == 16) {
                response = "very doubtful.";
            } else if (num == 17) {
                response = "without a doubt";
            } else if (num == 18) {
                response = "yes.";
            } else if (num == 19) {
                response = "yes - definitely.";
            } else {
                response = "you may rely on it.";
            }

            msg.reply(response);
            break;
        // command that generates a random, silly insult
        case 'insult':
            if (!args[1]) {
                msg.reply("Error! Please specify a person to insult!");
                break;
            }
            var response = args[1];

            // generate a random number to pick an insult
            var num = Math.floor(Math.random() * 10 + 1);
            switch (num) {
                case 1:
                    response += ", you are a classic example of the inverse ratio between the size of the mouth and the size of the brain.";
                    break;
                case 2:
                    response += ", you stuck up, half-witted, scruffy-looking… Nerf herder!";
                    break;
                case 3:
                    response += " may look like an idiot and talk like an idiot but don't let that fool you. They really are an idiot.";
                    break;
                case 4:
                    response += ", I fart in your general direction. Your mother was a hamster and your father smelt of elderberries.";
                    break;
                case 5:
                    response += " you are a sad strange little man, and you have my pity.";
                    break;
                case 6:
                    response += " Freaking idiot.";
                    break;
                case 7:
                    response += " you bowl like your momma. Unless of course she bowls well, in which case you bowl nothing like her.";
                    break;
                case 8:
                    response += " would bore the leggings off a village idiot.";
                    break;
                case 9:
                    response += " smeg head.";
                    break;
                case 10:
                    response += " I'll explain and I'll use small words so that you'll be sure to understand, you warthog-faced buffoon.";
                    break;
            }
            msg.channel.send(response);

            break;
        // command for choosing between two options
        case 'choice':
            if (!args[1] || !args[2]) {
                msg.reply("Error! Please specify two things to choose between!");
                break;
            }
            const DIVIDE = "|";
            var choice1 = "";
            var choice2 = "";
            var firstOption = true;

            for (var i = 1; i < args.length; i++) {
                if (args[i] === DIVIDE) {
                    firstOption = false;
                } else if (firstOption) {
                    choice1 += args[i] + " ";
                } else {
                    // don't add a space at the end if it's the last word in the choice
                    if (i == args.length - 1) {
                        choice2 += args[i];
                    } else {
                        choice2 += args[i] + " ";
                    }
                }
            }
            msg.channel.send(choice1 + "(🅰️) or " + choice2 + "(🅱️)?").then(messageReaction => {
                messageReaction.react("🅰️");
                messageReaction.react("🅱️");
            });
            break;
        // command for making the bot choose between 2 options
        case 'pick':
            if (!args[1] || !args[3]) {
                msg.reply("Error! Please specify two things to pick between!");
                break;
            }
            var n = Math.floor(Math.random() * 2 + 1);
            const OR = "or";
            var choice = "I pick ";
            var choice1 = "";
            var choice2 = "";
            var firstOption = true;

            // use a for loop to get multi-word choices
            for (var i = 1; i < args.length; i++) {
                if (args[i] === OR) {
                    firstOption = false;
                } else if (firstOption) {
                    choice1 += args[i] + " ";
                } else {
                    choice2 += args[i] + " ";
                }
            }

            // interpret the choice
            if (n === 1) {
                choice += choice1;
            } else {
                choice += choice2;
            }

            msg.channel.send(choice);
            break;
        // command for creating a poll with 2 options
        case 'poll':
            const Embed = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("How to start a poll")
            .setDescription("Use !poll <question> to start a simple yes/no poll!");

            if (!args[1]) {
                msg.channel.send(Embed);
                break;
            }
            
            let question = args.slice(1).join(" ");
            msg.channel.send(question).then(messageReaction  => {
                messageReaction.react("👍");
                messageReaction.react("👎");
            });
            break;
        // command for listing all of the commands in this bot
        case 'commands':
            var listOfCommands = "List of Commands:\n!ping - Pings the bot\n" +
                                "!info <version or author> - See information about this bot\n" +
                                "!dice - Roll a 20 sided die\n" + 
                                "!random <number> - generate a random number between 1 and <number>\n" +
                                "!chance <thing> - Tells you the chance that <thing> will happen with 100% accuracy\n" +
                                "!8ball <question> - Give you a magic 8 ball response to <question>\n" +
                                "!insult <person> - Insults <person> with a random insult\n" +
                                "!choice <thing1> | <thing2> - Generate a choice poll between two options\n" +
                                "!pick <thing1> or <thing2> - Make the bot pick between two things\n" +
                                "!poll <question> - Generate a simple yes/no poll\n" +
                                "!commands - list all valid commands this bot offers";
            const commands = new Discord.MessageEmbed()
            .setColor(0xFFD700)
            .setTitle("List of Commands")
            .setDescription(listOfCommands);

            msg.channel.send(commands);
            break;
       }
})

bot.login(TOKEN);
