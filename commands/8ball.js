/**
 * The 8ball command generates a random classic magic 8 ball response to the user
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "8ball",
    description: "generates a magic 8 ball message, can be in response to a question",
    execute(msg, args) {
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
    }
}