const logfile = process.env.LOGFILE || process.argv[2];
if (!logfile) {
  console.error("No Log File Path Provided");
  process.exit(1);
}
const webhookurl = process.env.WEBHOOKURL || process.argv[3];
if (!webhookurl) {
  console.error("No WEBHOOK URL Provided");
  process.exit(1);
}
console.log("LOGFILE:", logfile);
console.log("WEBHOOK:", webhookurl);
const axios = require('axios');
const Tail = require('tail').Tail;
let logp = new Tail(logfile, { follow: true });

postToDiscord = async function (message) {
  await axios.post(webhookurl, {
    content: '```xl\n' + message.substring(0, 2000) + '\n```'
  });
  message = message.substring(2000);
  while (message.length >= 2000) {
    await axios.post(webhookurl, {
      content: '```xl\n' + message.substring(0, 2000) + '\n```'
    });
    message = message.substring(2000);
  }

}
logp.on('exit', (code, signal) => {
  console.log('LOGS EXIT');
})
function handle(message) {
  postToDiscord(message).then(() => console.log("Sent message:", message)).catch((e) => console.error("Error occured: ", e))
}

logp.on('line', postToDiscord);
logp.on("error", postToDiscord);
