/*******************************************
* Author: MrDraug
* URL: https://draug.me
* URL2: https://loveandcoffee.io
* Licence: GNU General Public License (GPL) v.3
* Twitter: @draugdev
* Email: awolff@draug.me
*******************************************/

'use strict';

var TelegramBot = require('node-telegram-bot-api');

/* Get you Telegram Bot Token @BotFater */
var TOKEN = '';
var bot = new TelegramBot(TOKEN, {polling: {timeout: 1, interval: 100}});

/* Create your own API Token on https://steamapi.loveandcoffee.io */
var STEAM_API_TOKEN = ''; 
/* Create your own Steam API Token on https://steamcommunity.com/dev/apikey */
var STEAM_OF_API_TOKEN = '';

/* Steam Api URL */
var STEAM_PRICE_API = 'https://steamapi.loveandcoffee.io/api/prices/730/{0}?key={1}';
/* Steam CSGO Server Status API */
var STEAM_SERVER_STATUS_API = 'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key={0}';

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

/* Get server status for CSGO */
bot.on('message', function(msg){
  var chatId = msg.chat.id;
  if(msg.text == "/status") {
    var url = '';
    url = STEAM_SERVER_STATUS_API.format(STEAM_OF_API_TOKEN);
    request({
      url: url,
      json: true
    }, function(error, response, data){
        if(!error && response.statusCode == 200) {
          bot.sendMessage(chatId, "Server status: " + data['result']['matchmaking']['scheduler'] + ". Online Servers: " + data['result']['matchmaking']['online_servers'] + ". Online Players: " + data['result']['matchmaking']['online_players'] + ". Players Searching: " + data['result']['matchmaking']['searching_players'] + ".");
        } else {
          bot.sendMessage(chatId, "Sorry, I cant fetch data right now, try latter! :(")
        }
    })
  } 
});

/* Get name - return lowest price */
bot.on('message', function(msg){
  var chatId = msg.chat.id;
  var name;
  if(msg.text == name) 
    var url = '';
    url = STEAM_PRICE_API.format(msg.text, STEAM_API_TOKEN);
    request({
        url: url,
        json: true
    }, function(error, response, data){
        if (!error && response.statusCode === 200) 
          bot.sendMessage(chatId, data['market_hash_name'] + " - " + data['prices']['last'] + "$");
    })
});

/* Dont Die BITCH! */
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});