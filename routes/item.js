const express = require('express');
const Item = require('../models/item')
// Создаем роутер который отвечает за то, что мы будем возвращать по разным url и методам.
const router = express.Router();

// Дальше с помощью роутера настраиваем какие действия должны быть выполнены при попадании на разные url пользователем.
router.get('/', function(req, res){
    Item.find({}, function(err, items){         
        res.render("item_index", {items: items});
    });
});

router.get('/create', function(req, res){
    res.render("item_create");
});

router.post('/create', function(req, res){
    Item.create({
        name: req.body.name,
        description:req. body.description
    });

    res.redirect('/');
});

module.exports = router;