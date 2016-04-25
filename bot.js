'use strict';

var TelegramBot = require('node-telegram-bot-api');


/* Get you Telegram Bot Token @BotFater*/
var TOKEN = 'TOKEN';
/* Create your own API Token on https://steamapi.loveandcoffee.io */
var STEAM_API_TOKEN = 'STEAM_API_TOKEN' // Designer




var request = require("request")


var bot = new TelegramBot(TOKEN, {polling: {timeout: 1, interval: 100}});

var STEAM_PRICE_API = 'https://steamapi.loveandcoffee.io/api/prices/730/{0}?key={1}';

var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};


// Replacement like in Python
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/* WELCOME MESSAGE */
bot.on('message', function(msg){
  var chatId = msg.chat.id;
  var name;
  console.log(msg);
  if(msg.text == "/start") 
    bot.sendMessage(chatId, "Hello, just tell me the name of CSGO Skin. Exempel: AWP | Asiimov (Field-Tested) Price will be automaticly updated in 1min");

});


/* Get name - return lowest price */
bot.on('message', function(msg){
  var chatId = msg.chat.id;
  var name;
  console.log(msg);
  if(msg.text == name) 
    console.log(STEAM_PRICE_API.format(msg.text, STEAM_API_TOKEN))

    var url = STEAM_PRICE_API.format(msg.text, STEAM_API_TOKEN)

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body) // Print the json response
          bot.sendMessage(chatId, body['market_hash_name'] + " - " + body['prices']['lowest'] + "$");
        }
    })
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});