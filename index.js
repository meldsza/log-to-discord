let webhookurl = process.env.WEBHOOKURL;
let logfile = process.env.LOGFILE;
let request = require('request-promise-native');
const spawn = require('child_process').spawn;

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
let logp = spawn('tail -f -n 0', [logfile]);
logp.on('exit', (code, signal) => {
    console.log('LOGS EXIT');
})

logp.stderr.on('data',postToDiscord)
logp.stdout.on('data',postToDiscord)
