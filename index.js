const SlackBot = require('slackbots');
const axios = require('axios');

var bot = new SlackBot({
    token: 'xoxb-379846748119-378574745476-uY8TXhY7i7D90or7Rum1XcAL', // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'Interesting Bot'
});

//Start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel("bots-only", "Test", params);
});