require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const botToken = process.env.TELEGRAM_BOT_TOKEN; 
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`Chat ID: ${chatId}`);
    bot.sendMessage(chatId, 'Привет! Я бот, который будет уведомлять вас о новых заказах.');
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});