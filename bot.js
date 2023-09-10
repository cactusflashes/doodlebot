import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";
import { Client, Events, GatewayIntentBits, ActivityType } from 'discord.js'; 

const token = process.env.DISCORD_TOKEN; 
const channelId = process.env.CHANNEL_ID;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
		client.user.setStatus('online');
		client.user.setActivity(`you sleep`, { type: ActivityType.Watching });


		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY
			});
				  
		async function main() {
			const channelGen = client.channels.cache.get(channelId);
			const completion = await openai.chat.completions.create({
				messages: [{ role: 'user', content: 'Give me a creative prompt for an artist or creative to capture, that is no longer than three sentences and under 100 words.' }],
				model: 'gpt-3.5-turbo',
			});		

			const response = completion.choices[0].message.content; 

			function getGreeting() {
				let currentHour = new Date().getHours();	
					if (currentHour >= 5 && currentHour < 12) {
					return "Good morning,"; //if the time is past 5am and before noon => Good Morning 
					} else if (currentHour >= 12 && currentHour < 18) {
					return "Good afternoon,"; //if the time is past noon but before 6pm => Good Afternoon
					} else if (currentHour >= 18 && currentHour < 21) {
					return "Good evening,"; //if the time is past 6pm but before 9pm => Good Evening
					} else {
					return "Good night,"; //anything past 9pm before 5am => Good Night 
					}
				}

				let greeting = getGreeting(); 

				channelGen.send(`${greeting} @everyone! It's time to strech those creative muscles. Your prompt of the day is as follows: **${response}**`);

		}	  

		main();		

	});
	
	client.login(token);

	
