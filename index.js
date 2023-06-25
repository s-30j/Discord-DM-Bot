//----------------------------------------0-----//
//-----------3-3-3--------0-0-0-----------------//
//----------3-----3-----0------0----------j-----//
//----------------3-----0------0----------j-----//
//-----------3-3-3------0------0---j------j-----//
//----------------3-----0------0---j------j-----//
//----------3-----3-----0------0---j-----j------//
//-----------3-3-3-------0-0-0------j-j-j-------//

const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require('./config.js');

client.login(client.config.Bot.Token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if (message.content.startsWith(client.config.Bot.Command)) {
		if (!message.member.roles.cache.has(client.config.Bot.Admin_Role_ID)) {
		return message.channel.send(`You Are Not a Admin!❌ \n <@${message.member.id}>`);
		}
		if (message.author.bot) return;

		const user = message.mentions.users.first();
		if (!user || user.bot) {
		return message.reply('Please provide a valid user to send a PM to!');
		}

		// Get the message to send
		const content = message.content.slice(4).trim();

		// Send the PM
		user.send(` ${content}`)
		.then(() => {
			message.channel.send(`Message sent to ${user.username}!`);
		})
		.catch(() => {
			message.reply(`Unable to send a message to ${user.username}. Please check if the user allows direct messages.`);
		});
	}
});

const lastMessages = new Map();
const lastMessages2 = new Map();

client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == "text") return;
  	const user = client.users.cache.get(message.author.id);
	if (!user || user.bot) {
		return;
	}	

  	if (message.author == "User Block ID") {
		message.author.send('You Are Blocked'); 
		return;
	}
  if (lastMessages2.has(message.author.id) && lastMessages2.get(message.author.id) == 'spam') {
	message.author.send('Your Message Blockd : Spam'); 
    return;
  }

  	lastMessages2.set(message.author.id, "spam");
  	const channelsend = client.channels.cache.get(client.config.Bot.DM_Channel_ID);
	setInterval(() => {
		lastMessages2.set(message.author.id, "no");
	}, 2500); 
	if (message.attachments.size > 0) {
		const attachment = message.attachments.first();
		if (attachment.url) {
		  	const attachment = message.attachments.first();
			channelsend.send(`DM | ${message.author.id} | ${message.author.tag} :  ${attachment.url} \n ${message}  `);
			return;
		}
	}
	channelsend.send(`DM | ${message.author.id} | ${message.author.tag} :  ${message}`);
  if (lastMessages.has(message.author.id) && lastMessages.get(message.author.id) == 'trues') {
    return;
  }
  lastMessages.set(message.author.id, "trues");
  message.author.send('This Script Discord DM Bot By 30j \n Recived Your Message \n This bot is made to receive your message so that you can communicate with special admins'); 
});
