const SlackBot = require('slackbots');
const axios = require('axios');

var answered = false;

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

    handleMessage(data);
});

// Respond to input
function handleMessage (data) {
    const message = data.text;
    if (message.includes(" help")) {
        bot.postMessageToChannel("bots-only", "Usage:  trivia <category>, or trivia random", null);
    } else if (message.includes(" random" || " trivia random")) {
        answered = false;
        random();
    } else if (message.includes(" trivia film")) {
        answered = false;
        triviaMessage(data.user, "film");
    } else if (message.includes(" trivia computers")) {
        answered = false;
        triviaMessage(data.user, "computers");
    } else if (message.includes(" trivia math")) {
        answered = false;
        triviaMessage(data.user, "math");
    } else if (message.includes(" trivia geography")) {
        answered = false;
        triviaMessage(data.user, "computers");
    } else if (message.includes(" trivia sports")) {
        answered = false;
        triviaMessage(data.user, "computers");
    } else if (message.includes(" chucknorris")) {
        answered = false;
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
            triviaMessage(data.user);
            break;
    }
}  

function triviaMessage (user) {
    axios.get("https://opentdb.com/api.php?amount=1").
        then(res => {
            const question = res.data.results[0]["question"];
            bot.postMessageToChannel("bots-only", `Question: ${question}`, null);

            const answer = res.data.results[0]["correct_answer"];
            console.log(answer);
            bot.on('message', (data) => {
                if (data.type !== 'message') {
                    return;
                }
            
                const userAnswer = data.text;
                if (!answered && data.user === user) {
                    if (userAnswer.toLowerCase().includes(answer.toLowerCase())) {
                        bot.postMessageToChannel("bots-only", "Correct!", null);
                    } else {
                        console.log("wrong");
                        bot.postMessageToChannel("bots-only", `Wrong! Correct answer is ${answer}`, null);
                    }
                    answered = true;
                }
            });
        });
}

function chuckJoke () {
    axios.get("http://api.icndb.com/jokes/random/")
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            }
        
            bot.postMessageToChannel("bots-only", `Chuck Norris: ${joke}`, params); 
        });
}