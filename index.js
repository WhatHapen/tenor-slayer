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
    var case_dict = {'tenor.com/view/':0,'https://tenor.com/':0,
                     'static.klipy.com/':1,'https://klipy.com/':1,
                     'anakama.xyz':2,'anakama.xyz/owned':2,'anakama.xyz/sowned':2,'owned.anakama.xyz/':2,'sowned.anakama.xyz/':2}
    
    for (const key of Object.keys(case_dict)) {
      if (message.content.includes(key)) {
        var message_type = case_dict[key]
        try {
          await message.delete();
          switch (message_type) {
            case 0:
              console.log('tenor deleted');
              await message.channel.send(`[[Tenor]] LINK DELETED. [!$!$] OFF, <@${message.author.id}>.`);
              break;
            case 1:
              console.log('klipy deleted');
              await message.channel.send(`[[Klipy]] LINK DELETED. [!$!$] OFF, <@${message.author.id}>.`);
              break;
            case 2:
              console.log('imposter website deleted');
              await message.channel.send(`[[Imposter]] LINK DELETED. THIS TOWN AIN'T BIG ENOUGH FOR THE TWO OF US, PAL. [!$!$] YOURSELF, <@${message.author.id}>.`);
              break;
          }
        } catch (error) {
          console.error(error);
        }
            break;
      }
    }
    /////////////////////////////
    //////// SAY COMMAND ////////
    /////////////////////////////
    if (message.content.startsWith('-say') && (message.member.roles.cache.has('210999903399182336'))) {
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
    //////// SCAMBOT OWNAGE //////// // MUST BE KEPT AT THE END OF THE bot.on FUNC DUE TO RETURN COMMAND
    ////////////////////////////////
    if (message.attachments.size > 0) {
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
