/**
 * The insult command picks a random insult to use on a specified target. This command
 * is meant to be used for fun, and the insults are mostly classic sci-fi quotes
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "insult",
    description: "generates a random movie quote insult",
    execute(msg, args) {
        if (!args[1]) {
            msg.reply("Error! Please specify a person to insult!");
        } else {
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
        }
    }
}