/**
 * The chance command randomly generates a percentage chance that an event will happen,
 * and informs the user of this chance
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "chance",
    description: "generates a random chance that something will happen",
    execute(msg, args) {
        var response = "The chance ";
            for (var i = 1; i < args.length; i++) {
                // replace any I's with you's for grammar
                if (args[i] === "I" || args[i] === "me") {
                    response += "you ";
                } else if (args[i] === "my") {
                    response += "your ";
                } else if (args[i] === "mine") {
                    response += "yours ";
                } else {
                    response += args[i] + " ";
                }
            }
            var chance = Math.floor(Math.random() * 100 + 1);
            response += "is " + chance + "%";
            msg.reply(response);
    }
}