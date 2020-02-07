const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js'); 


//discord login 
const client = new Discord.Client();  
client.on('ready', () => {   
    console.log(`Logged in as ${client.user.tag}!`); 
});

//client hash
client.login("<bot ao2>");


    function sendMessage(match,url,team1,team2) {
        //channelid
        let channel = "<channel id>";


            console.log("Melding er sendt!");

            //message
            client.channels.get(channel).send(
                {embed: 
                {color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                      },
                title: `NY KAMP: ${match} mellom ${team2} og ${team1}.`,
                description:`https://gamer.no${url}`,
                
             }} )
        
    }





//grabbing the website url
var searchUrl = 'https://www.gamer.no/klubber/lunx-esports/81919';

//Going to save the information here
var savedData = "";


setInterval( publish, 30 * 60 * 1000); // checking every 30 min

//making it run through this at the begining
var status = true;


function publish(){
    //if true, it will go through the scraping and could send the dc message aswell
    if(status === true) {
            request(searchUrl, function(err, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (err) {
                return res.status(500).send(err);
            }
            var $ = cheerio.load(html);
            // Getting the first game on gamerno

            //matchdate
            const matchdate = $("#main > div > div.flex-row.break-mobile > div:nth-child(3) > div > div:nth-child(2) > ul > li:nth-child(1) > a > span > span").text();

            //matchurl
            const matchurl = $("#main > div > div.flex-row.break-mobile > div:nth-child(3) > div > div:nth-child(2) > ul > li:nth-child(1) > a").attr('href');

            //teamOne
            const teamone = $('#main > div > div.flex-row.break-mobile > div:nth-child(3) > div > div:nth-child(2) > ul > li:nth-child(1) > a > div > span.teams.block.clearfix > span:nth-child(1) > span').text();

            //teamtwo
            const teamtwo = $('#main > div > div.flex-row.break-mobile > div:nth-child(3) > div > div:nth-child(2) > ul > li:nth-child(1) > a > div > span.teams.block.clearfix > span:nth-child(2) > span').text();

                //checking if the there is anything in the selector, if not we will just console.log that there is no new news 
                 if(matchdate === "" || matchurl === "") {
                    console.log("no games added")
                } else {
                    //saving the data
                    sendMessage(matchdate,matchurl,teamone,teamtwo)

                    savedData = matchdate + matchurl;
                    
                }

            //changing status so it doesnt send message every 30min
            status = matchdate + matchurl;
            });
            

    }

    //made this it doesnt send message about the same game every 30 min
    if(status === savedData) {
    } else {
    status = true;
    }
}
