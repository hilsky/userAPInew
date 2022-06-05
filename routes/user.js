const express = require('express');
const res = require('express/lib/response');
const route = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');

route.get('/', (req, res) => {
    User.find()
        .then(user =>{
            res.send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

route.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

route.get('/:id', async (req, res) => {
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send('The user with the given ID was not found.');
            }
            res.send(user);
        } else {
            res.status(400).send('Invalid ID');
        }
    }
    catch(err){
        res.status(500).send(err);
    }
})

route.delete('/:id', (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).send({
                message: 'Invalid ID'
            });
        }
        User.findByIdAndRemove(req.params.id)
            .then(user => {
                if(!user) {
                    res.status(404).send({
                        message: 'User not found'
                    });
                }
                res.send(user);
            })
            .catch(err => {
                res.status(400).send(err);
            }
        );
    } catch (error) {
        res.status(400).send(error);

    }
});

route.put('/:id', async (req, res) => {
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }, {new: true});
            res.send(updateUser);
        } else {
            res.status(400).send('Invalid ID');
        }
    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports = route;