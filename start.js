const cgpt = require('chatgpt-lib');
const config = require('./config');
var count = 0;

async function writeToFile(answerOfBot, topicHeader) {
    var fs = require('fs');
    fs.writeFile("C:/Users/samet/Desktop/chatGPT/content/" + topicHeader + ".txt", topicHeader + "\n" + answerOfBot, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


async function readTopics(path) {
    var fs = require('fs');
    var array = fs.readFileSync(path).toString().split("\n");
    for (i in array) {
        console.log(array[i]);
        await startBot(array[i]);
        topicHeader = array[i];
        count++;
    }
}

async function startBot(topic) {
    const chatbot = new cgpt.ChatGPT(config);
    let answer = await chatbot.ask(topic);
    console.log(answer);
    await writeToFile(answer, topic);
}

readTopics('./topic.txt');