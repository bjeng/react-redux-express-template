const express = require('express');
const router = express.Router();
const models = require('./models');
const Card = models.Card;

router.post('/newCard', (req, res) => {
    var newCard = new Card({
        name: req.body.name,
        apr: req.body.apr,
        limit: req.body.limit,
        balance: 0,
        daysOpen: 0,
        interest: 0
    });
    newCard.save(function(err, card) {
        if (err) {
            console.log(err);
            res.status(500).redirect('/');
            return;
        }
        res.json(card);
    });
});

router.get('/cards', (req, res) => {
    Card.find({}, function(err, cards) {
        if (err) {
            console.log('Error fetching cards', err);
            return;
        }
        res.json(cards);
    });
});

router.post('/makeCharge', (req, res) => {
    Card.findById(req.body.id, function(err, card) {
        if (err) {
            console.log('Error fetching card', err);
            return;
        }
        card.balance = JSON.parse(card.balance) + JSON.parse(req.body.charge);
        if(card.balance <= card.limit) {
            card.save(function(saveErr, saveCard) {
                if (saveErr) {
                    console.log(saveErr);
                    res.status(500).redirect('/');
                    return;
                }
                res.json(saveCard);
            });
        } else {
            res.json('charge exceeds limit');
        }
    });
});

router.post('/makePay', (req, res) => {
    Card.findById(req.body.id, function(err, card) {
        if (err) {
            console.log('Error fetching card', err);
            return;
        }
        card.balance = JSON.parse(card.balance) - JSON.parse(req.body.pay);
        if(card.balance >= 0) {
            card.save(function(saveErr, saveCard) {
                if (saveErr) {
                    console.log(saveErr);
                    res.status(500).redirect('/');
                    return;
                }
                res.json(saveCard);
            });
        } else {
            res.json('cannot pay more than outstanding balance');
        }
    });
});

router.post('/nextDay', (req, res) => {
    Card.find({})
    .then(function(result) {
        const promises = [];
        for(var i = 0; i < result.length; i++) {
            result[i].interest = result[i].interest + (result[i].balance * result[i].apr / 100 / 365);
            result[i].daysOpen++;
            if(result[i].daysOpen % 30 === 0) {
                var newBalance = result[i].balance + result[i].interest;
                result[i].balance = newBalance.toFixed(2);
                result[i].interest = 0;
            }
            promises.push(result[i].save());
        }
        return Promise.all(promises);
    })
    .then(function() {
        Card.find({}, function(updatedErr, updatedCards) {
            if (updatedErr) {
                console.log('Error fetching cards', updatedErr);
                return;
            }
            res.json(updatedCards);
        });
    })
    .catch(function(error) {
        if (error) {
            console.log('CAUGHT ERROR', error);
            res.status(500).redirect('/');
            return;
        }
    });
});

module.exports = router;
