/**
 * Makes a meme appear in discord chat, based off of the image-only service "dogpile", that also limits images per page.
 * v1.1.0 - Implemented, with random chance for various game references
 *
 * @author Codelyon
 * @author Joel Kophazi
 */
 
 module.exports = {
    name: "meme",
    description: "Loads a random meme from google images",
    execute(msg, args, Discord, cheerio, request) {
        const memeHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                        // should have a set of syntax, example, and output for each possible
                        '"!meme"\n\n' + 
                        'Other Information:\n' + 
                        'Images loaded are based on the google.com search engine and are essentially random. User assumes all risk.');
        if (args[1] && args[1].toLocaleLowerCase() == "help") {
            msg.channel.send(memeHelp);
        } else {

            var numOptions = 10
            var searchNumber = Math.floor(Math.random() * numOptions)
            var searchString = ""
            switch (searchNumber) {
                case 0:
                    searchString = "meme";
                    break;
                case 1:
                    searchString = "funny meme";
                    break;
                case 2:
                    searchString = "global meme";
                    break;
                case 3:
                    searchString = "animal crossings meme";
                    break;
                case 4:
                    searchString = "League of Legends meme";
                    break;
                case 5:
                    searchString = "minecraft meme";
                    break;
                case 6:
                    searchString = "rocket league meme";
                    break;
                case 7:
                    searchString = "wholesome meme";
                    break;
                case 8:
                    searchString = "college meme";
                    break;
                case 9:
                    searchString = "doggo meme";
                    break;
                default:
                    searchString = "cursed meme";
                    break;
            }
            
            var options = {              //sets up search engine access parameters
                url: "http://results.dogpile.com/serp?qc=images&q=" + searchString,
                //url: "https://www.google.com/search?q=" + searchString + "&hl=en&sxsrf=ALeKk01tT12RTMot-gUYpcv9xHk7Zdljng:1591410863466&source=lnms&tbm=isch&sa=X",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
         
            request(options, function(error, response, responseBody) {
                if (error) {return;}   //exits function if error

                $ = cheerio.load(responseBody);    //very important, don't know why
                var links = $(".image a.link");    // ditto^
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));   //databases (all?) possible results
                //console.log(urls);              //gives log in console of (all?) possible results (unnecessary)
                if (!urls.length) {return;}    //exits if no image URLs gathered (which would error the send command)
                // Send result
                msg.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            });

        }
    }
}