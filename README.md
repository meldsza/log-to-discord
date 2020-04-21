# log-to-discord
Tails 
logs and posts to discord

### Installation
Download the package and then either pass the webhookurl and logfile as env or edit the index.js file

### Usage  
You can pass the logfile path and webhook path either as a environment variable or as an argument. 
The script listens to two environment variables: `LOGFILE` and `WEBHOOKURL`
You can also pass it as arguments:
node index.js path/to/log/file https://canary.discordapp.com/api/webhooks/webhool_id_here/webhook_token_here
