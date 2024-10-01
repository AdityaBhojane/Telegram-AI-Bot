import dotenv from 'dotenv';
dotenv.config();

import TelegramBot from 'node-telegram-bot-api';
import run from './gemini.js';

const Token = process.env.TOKEN;

console.log("Telegram Bot Token:", Token); // Check token

const bot = new TelegramBot(Token, { polling: true });

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, "If you want to use Gemini Ai then use this : /Gemini then text OR else Please few sec ...");
});

bot.onText(/\/Gemini/, async (msg) => {
  const response = await GeminiResponse(msg.text); 
  if (!response) {
    bot.sendMessage(msg.chat.id, "Sorry, I couldn't generate a response.");
  } else {
    bot.sendMessage(msg.chat.id, response); 
  }
});

async function GeminiResponse(text) {
  const response = await run(text);
  return response
}

