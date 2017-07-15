// Node requirements
const path = require('path');

// Bot setup
const Botmaster = require('botmaster');
const TwitterBot = require('botmaster-twitter-dm');
const twitterSettings = require(path.resolve(__dirname, 'config'));

const botmaster = new Botmaster();
const twitterBot = new TwitterBot(twitterSettings);

botmaster.addBot(twitterBot);

// Own requirements: controllers, messages 
const messages = require(path.resolve(__dirname, 'messages', 'index'));

let myIncomingMiddlewareController = (bot, update) => {
    if (update.message.text === 'hi' ||
        update.message.text === 'Hi' ||
        update.message.text === 'hello' ||
        update.message.text === 'Hello' ||
        update.message.text === 'yo' ||
        update.message.text === 'Hey' ||
        update.message.text === 'hey') {
        bot.sendTextCascadeTo(messages.tutorial, update.sender.id);
    }
};

botmaster.use({
    type: 'incoming',
    name: 'My incoming middleware',
    controller: myIncomingMiddlewareController,
});