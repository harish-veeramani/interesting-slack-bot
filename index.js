const SlackBot = require('slackbots');
const axios = require('axios');

var bot = new SlackBot({
    token: 'xoxb-379846748119-378574745476-uY8TXhY7i7D90or7Rum1XcAL', // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'Interesting Bot'
});

// Start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel("bots-only", "Test", params);
});

// Error handler
bot.on('error', (error) => {
    console.log(error)
});

// Message handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// Respond to input
function handleMessage (message) {
    if (message.includes(" random")) {
        random();
        return;
    }
    if (message.includes(" trivia")) {
        triviaMessage();
    }
    if (message.includes(" chucknorris")) {
        chuckJoke();
    }
}

// Outputs
function random () {
    const rand = Math.floor(Math.random() * 2) + 1;
    switch (rand) {
        case 1:
          chuckJoke();
          break;
        case 2:
          triviaMessage();
          break;
      }
}

function triviaMessage () {
    bot.postMessageToChannel("bots-only", "Trivia", null);
}

function chuckJoke () {
    axios.get("http://api.icndb.com/jokes/random/")
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            }
        
            bot.postMessageToChannel("bots-only", `Chuck Norris: ${joke}`, params); 
        })
}