'use strict';

var TelegramBot = require('node-telegram-bot-api');

/* Get you Telegram Bot Token @BotFater */
var TOKEN = '';


var bot = new TelegramBot(TOKEN, {polling: {timeout: 1, interval: 100}});


/* Create your own API Token on https://steamapi.loveandcoffee.io */
var STEAM_API_TOKEN = ''; 

/* Steam Api URL */
var STEAM_PRICE_API = 'https://steamapi.loveandcoffee.io/api/prices/730/{0}?key={1}';

//Load the request module
var request = require('request')

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
  if(msg.text == name) 
    var url = STEAM_PRICE_API.format(msg.text, STEAM_API_TOKEN);
    request({
        url: STEAM_PRICE_API.format(msg.text, STEAM_API_TOKEN),
        json: true
    }, function(error, response, data){
        if (!error && response.statusCode === 200) 
          bot.sendMessage(chatId, data['market_hash_name'] + " - " + data['prices']['lowest'] + "$");
    })
});

/* Dont Die BITCH! */
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});