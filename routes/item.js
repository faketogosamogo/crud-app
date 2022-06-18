const express = require('express');
const Item = require('../models/item');
const mongoose = require('mongoose');
// Создаем роутер который отвечает за то, что мы будем возвращать по разным url и методам.
const router = express.Router();

// Дальше с помощью роутера настраиваем какие действия должны быть выполнены при попадании на разные url пользователем.

router.get('/', function(req, res){
    Item.find({}, function(err, items){         
        res.render("item_index", {items: items});
    });
});

router.post('/:id/update', function(req, res){
    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description:req. body.description
    }, function(err, item){
        res.redirect('/items')
    });
});

router.get('/create', function(req, res){
    Item.findById(req.params.id, function(err, item){         
        res.render("item_create", {item: item});
    });
});

router.post('/create', function(req, res){
    Item.create({
        id: new mongoose.mongo.ObjectId(),
        name: req.body.name,
        description:req. body.description
    });

    res.redirect('/items');
});

router.post('/:id/delete', function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err, item){
        res.redirect('/items')
    });
});

router.get('/:id', function(req, res){
    Item.findById(req.params.id, function(err, item){         
        res.render("item_get", {item: item});
    });
});

module.exports = router;