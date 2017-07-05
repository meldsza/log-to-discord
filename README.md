# log-to-discord
Tails 
logs and posts to discord

### Installation
Download the package and then either pass the webhookurl and logfile as env or edit the index.js file

### Usage  
    WEBHOOKURL=WEBHOOK_URL_HERE LOGFILE=/etc/someapp/logs/somelog.log node index.js
if you code the webhook url and logfile path into the index.js file then  
    node index.js
