var Discord = require('discord.js');

// Initialize Discord Bot
var bot = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES'
  ]
});

function changeStatus() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      bot.user.setPresence({
        activities: [{
          name: 'for your filthy Klipy links',
          type: 'WATCHING'
        }]
      });
      break;
    case 1:
      bot.user.setPresence({
        activities: [{
          name: 'Whack-A-Klipy',
          type: 'PLAYING'
        }]
      });
      break;
    case 2:
      bot.user.setPresence({
        activities: [{
          name: 'the screams of Klipy links while they are being exterminated',
          type: 'LISTENING'
        }]
      });
      break;
  }
}

bot.on('ready', () => {
    console.log('Logged in as', bot.user.tag, 'ID:', bot.user.id);
    setInterval(function() {
      changeStatus();
    }, 1000 * 60 * 60 * 24);
    changeStatus();
});

var SAY_AUTHORS = [
    '148570340853809153',
    '140890929287528448',
    '450488877283803148',
    '235563065561579522',
    '108892284119977984',
    '292741623253565441',
    '367817412441145344',
    '148231501413089280',
    '149410597513986048',
    '148303871989514240',
    '786723445873442856'
];

bot.on('messageCreate', async message => {
    if (message.content.includes('tenor.com/view/') || (
      message.content.includes('https://tenor.com/')
    )) {
      try {
        console.log('tenor deleted')
        await message.delete();
        await message.channel.send(`[[Tenor]] LINK DELETED. [!$!$] OFF, <@${message.author.id}>.`);
      } catch (error) {
        console.error('wtf tenor', error);
      }
    }
      if (message.content.includes('static.klipy.com/') || (
          message.content.includes('https://klipy.com/')
        )) {
      try {
        console.log('klipy deleted')
        await message.delete();
        await message.channel.send(`[[Klipy]] LINK DELETED. [!$!$] OFF, <@${message.author.id}>.`);
      } catch (error) {
        console.error('wtf klipy', error);
      }
    }
    if (message.content.startsWith('-say') && SAY_AUTHORS.includes(message.author.id)) {
        try {
            const match = /-say <#(\d+)> (.+)/u.exec(message.content);
            if (match) {
                const channel = await message.guild.channels.fetch(match[1]);
                channel.send(match[2]);
            }
        } catch (error) {
            console.error(error);
        }
        return;
    }
});
bot.login(process.env.TOKEN);

// Just in case we need this later.
var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(process.env.PORT);
