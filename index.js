var Discord = require('discord.js');

// Initialize Discord Bot
var bot = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES'
  ]
});

var messages_with_attachments = {};

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
      changeStatus()
    }, 1000 * 60 * 60 * 24);
    changeStatus();

    setInterval(function() {
      reset_dictionary()
    }, 1000 * 60 * 60 * 24);
    reset_dictionary();
});

async function reset_dictionary() {
  messages_with_attachments = {};
}

bot.on('messageCreate', async message => {
    //////////////////////////////////
    //////// MESSAGE DELETION ////////
    //////////////////////////////////
    if (message.content.includes('tenor.com/view/') || ( // TENOR
      message.content.includes('https://tenor.com/')
    )) {
      try {
        console.log('tenor deleted');
        await message.delete();
        await message.channel.send(`[[Tenor]] LINK DELETED. [!$!$] OFF, <@${message.author.id}>.`);
      } catch (error) {
        console.error('wtf tenor', error);
      }
    }
      if (message.content.includes('static.klipy.com/') || ( // KLIPY
          message.content.includes('https://klipy.com/')
        )) {
      try {
        console.log('klipy deleted');
        await message.delete();
        await message.channel.send(`[[Klipy]] LINK DELETED. [!$!$] OFF, <@${message.author.id}>.`);
      } catch (error) {
        console.error('wtf klipy', error);
      }
    }
    if (message.content.includes('anakama.xyz/owned') || ( // IMPOSTER WEBSITE
        message.content.includes('anakama.xyz/sowned')
    )) {
      try {
        console.log('imposter website deleted');
        await message.delete();
        await message.channel.send(`[[Imposter]] LINK DELETED. THIS TOWN AIN'T BIG ENOUGH FOR THE TWO OF US, PAL. [!$!$] YOURSELF, <@${message.author.id}>.`);
      } catch (error) {
        console.error('wtf embed', error);
      }
    }
    /////////////////////////////
    //////// SAY COMMAND ////////
    /////////////////////////////
      if (message.content.startsWith('-say') && (message.member.roles.cache.has('1305201858284884059'))
        try {
            const match = /-say <#(\d+)> (.+)/u.exec(message.content);
            if (match) {
                const channel = await message.guild.channels.fetch(match[1]);
                channel.send(match[2]);
                console.log('message created');
            }
        } catch (error) {
            console.error(error);
        }
        return;
    }
    ////////////////////////////////
    //////// SCAMBOT OWNAGE ////////
    ////////////////////////////////
    if (message.attachments.size > 0) { // MUST BE KEPT AT THE END OF THE bot.on FUNC DUE TO RETURN COMMAND
      if (!messages_with_attachments[message.author.id]) {
        messages_with_attachments[message.author.id] = [];
      }
      messages_with_attachments[message.author.id].unshift(message);
      if (messages_with_attachments[message.author.id].length < 3){
        return;
      } 
      var third_to_last = messages_with_attachments[message.author.id][2]
      if ((message.createdTimestamp - third_to_last.createdTimestamp) < 10000.0) {
        await message.channel.send(`[[Scam]] MESSAGE DELETED. [!$!$] OFF, <@${message.author.id}>.`);
        for (const mess of messages_with_attachments[message.author.id]) {
          if ((message.createdTimestamp - mess.createdTimestamp) < 180000.0) {
            await mess.delete();
        await message.member.kick();
          }
        }
      }
    }
});
bot.login(process.env.TOKEN);

// Just in case we need this later.
var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(process.env.PORT);
