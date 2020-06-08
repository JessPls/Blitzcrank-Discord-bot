/**
 * Makes a image appear in discord chat, based off of the image-only service "dogpile", that also limits images per page.
 *v1.1.0 - Implemented, but blocked for unmonitored abuse concerns
 * 
 * @author Codelyon
 * @author Joel Kophazi
 */
 
 module.exports = {
    name: "image",
    description: "Loads an image from google images based on user input",
    execute(msg, args, Discord, cheerio, request) {
        const imageHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - " + module.exports.name)
        .setDescription('Description:\n' +
                        module.exports.description +
                        "\n\n" +
                        'Syntax: \n\n' +                        // should have a set of syntax, example, and output for each possible
                        '"!image <search criteria>"\n' + 
                        'Example: "!image cute puppies"\n\n' + 
                        'Other Information:\n' + 
                        'Images loaded are based on the google.com search engine and are essentially random. User assumes all risk.');
        if (!args[1] || (args[1] && args[1].toLocaleLowerCase() == "help")) {
            msg.channel.send(imageHelp);
        } else {

            var searchString = ""
            for (var i = 1; i < args.length; i++) {
                    searchString += args[i] + " ";
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
                if (!urls.length) { return; }    //exits if no image URLs gathered (which would error the send command)
                // Send result
                msg.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            });

        }
    }
}