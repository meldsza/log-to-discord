const webhookurl = process.env.WEBHOOKURL;
const logfile = process.env.LOGFILE;
const request = require('request-promise-native');
const Tail = require('tail').Tail;
let logp = new Tail(logfile,{follow: true});

postToDiscord = async function(message){
  if(message.length>=2000)
  {
    while(message.length>=2000)
    {
      await request({
        uri: webhookurl,
        method: "POST",
        content: '```xl\n'+message.substring(0,2000)+'\n```'
      });
      message = message.substring(2000);
    }
  }
  else
  {
    return await request({
        uri: webhookurl,
        method: "POST",
        content: '```xl\n'+message+'\n```'
      });
  }
}
logp.on('exit', (code, signal) => {
    console.log('LOGS EXIT');
})

logp.on('line',postToDiscord);
logp.on("error",postToDiscord);
