const express = require("express");
const config = require("config");
const hbs = require("hbs");
const expressHbs = require("express-handlebars")
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') // нужно чтобы отключить запрет доступа к свойствам моделей из view.
const bodyParser = require('body-parser')
const port = config.get("port");
const app = express();

// Здесь мы подключаем слои. Например ты не будешь на каждой странице писать и нижний блок и навигацию и кодировку определять.
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }
));
// Подключаем движок представлений Handlebars. Он нужен чтобы более быстро писать html страницы. 
// Например ты написал в файйлу hbs {{#if}}  а этого в html нет, когда приложение запустится, то это условие отработает и создастся обычный html с кодом который был в блоке {{$if}} чтобы отобразить в браузере.
app.set("view engine", "hbs");
// Здесь мы добавляем частичные представление. Например ты не будешь на каждую страницу отдельно писать меню, а с помощью движка представлений просто его встроишь.
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// подключаем поддержку считывания тела запроса с application/***-urlencoded.
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

// подключаемся к базе.
mongoose.connect(config.get("mongodb"));

// объявляем путь к стартовой странице приложения.
app.get('/', (req, res) => {
    res.render("index")
})

// подключаем роутеры.
app.use('/items', require("./routes/item"));

// Когда приложение запускается, у него есть порт(либо несколько). 
// Здесь говорится что приложение будет слушать порт, через который к нему можно обратиться.
app.listen (port, ()=>{
    console.log(`Приложение слушает порт: ${port}`);
});
