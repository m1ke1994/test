require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3005;
// Настройка CORS
app.use(cors());
app.use(express.static(path.join(__dirname, '../front/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/dist/index.html'));
});
// Обработка предварительных запросов OPTIONS
app.options('*', cors());
// Настройка POST-запроса — JSON
app.use(express.json());
app.use(express.static('public'));
// Настройка сервера
app.listen(PORT, '0.0.0.0', () => {
    console.log(`http://195.133.27.170:${PORT}`);
});



// Настройка БД
const mongoose = require('mongoose');
const mongo_Url = process.env.MONGODB_URL;

mongoose.connect(mongo_Url, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Схемы

const smartfoneSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    category: String,
    model: String,
});
const Smartfone = mongoose.model('smartfones', smartfoneSchema);

const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    category: String,
    model: String,
    color: String,
});

// Роуты
app.get('/api/all', async function (req, res) {
    let model = req.query.model;
    let category = req.query.category;
    let search = {};

    if (model) {
        model = model.trim();
        search.model = { $regex: model, $options: 'i' };
    }
    if (category) {
        category = category.trim();
        search.category = category;
    }
    try {
        let data = await Smartfone.find(search).limit(23);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Отправление данных на сервер и затем в базу данных
const orderSchema = new mongoose.Schema({
    orderNumber: Number,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    telephone: { type: Number, required: true },
    email: { type: String, required: true },
    adress: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    products: { type: Array, required: true }
}, {
    timestamps: true
});

const Order = mongoose.model('order', orderSchema);

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

async function getNextOrderNumber() {
    const counter = await Counter.findByIdAndUpdate(
        'orderNumber',
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return counter.sequence_value;
}

app.post('/api/order', async (req, res) => {
    try {
        const orderNumber = await getNextOrderNumber();

        const order = new Order({
            orderNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            telephone: req.body.telephone,
            email: req.body.email,
            adress: req.body.adress,
            description: req.body.description,
            price: req.body.price,
            products: req.body.products
        });

        await order.save();

        // Отправка уведомления о новом заказе в Telegram
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const bot = new TelegramBot(botToken, { polling: false }); // Отключаем polling

        // Получаем названия и модели товаров
        const productDetails = await Promise.all(order.products.map(async (productId) => {
            const product = await Smartfone.findById(productId);
            return product ? `${product.title} (${product.model})` : 'Неизвестный товар';
        }));

        const message = `Новый заказ #${orderNumber}!\n\nИмя: ${order.firstName} ${order.lastName}\nТелефон: ${order.telephone}\nEmail: ${order.email}\nАдрес: ${order.adress}\nОписание: ${order.description}\nЦена: ${order.price}\nТовары: ${productDetails.join(', ')}`;
        bot.sendMessage(chatId, message);

        res.sendStatus(201); // Отправка статуса 201 (Created) при успешном создании заказа
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); // Обработка ошибок и отправка статуса 500 (Internal Server Error)
    }
});