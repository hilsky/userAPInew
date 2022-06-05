const express = require('express');
const res = require('express/lib/response');
const route = express.Router();
const mongoose = require('mongoose');
const {Produk} = require('../models/produk');

route.post('/', (req, res) => {
    const produk = new Produk({
        idProduk: req.body.idProduk,
        namaProduk: req.body.namaProduk,
        harga: req.body.harga,
        jenisProduk: req.body.jenisProduk
    });
    produk.save()
        .then(produk => {
            res.send(produk);
        }
        ).catch(err => {
            res.status(400).send(err);
        }
        );
});

route.get('/', (req, res) => {
    Produk.find()
        .then(produk => {
            res.send(produk);
        }
        ).catch(err => {
            res.status(400).send(err);
        }
        );
}
);

//get by idProduk
route.get('/:id', async (req, res) => {
    //idProduk
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.idProduk)){
            const produk = await Produk.findById(req.params.idProduk);
            if (!produk) {
                return res.status(404).send('The produk with the given ID was not found.');
            }
            res.send(produk);
        } else {
            res.status(400).send('Invalid ID');
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}
);

route.delete('/:id', (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.idProduk)) {
            res.status(400).send({
                message: 'Invalid ID'
            });
        }
        Produk.findByIdAndRemove(req.params.idProduk)
            .then(produk => {
                if(!produk) {
                    res.status(404).send({
                        message: 'Produk not found'
                    });
                }
                res.send(produk);
            }
            ).catch(err => {
                res.status(500).send(err);
            }
            );
    }
    catch(err){
        res.status(500).send(err);
    }
})

route.put('/:id', (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.idProduk)) {
            res.status(400).send({
                message: 'Invalid ID'
            });
        }
        Produk.findByIdAndUpdate(req.params.idProduk, {
            idProduk: req.body.idProduk,
            namaProduk: req.body.namaProduk,
            harga: req.body.harga,
            jenisProduk: req.body.jenisProduk
        }
        ).then(produk => {
            if(!produk) {
                res.status(404).send({
                    message: 'Produk not found'
                });
            }
            res.send(produk);
        }
        ).catch(err => {
            res.status(500).send(err);
        }
        );
    }
    catch(err){
        res.status(500).send(err);
    }
})


//fidn by name produk and then delete
route.delete('/:idProduk', (req, res) => {
    try {
        Produk.findOneAndRemove({
            idProduk: req.params.idProduk
        }
        ).then(produk => {
            if(!produk) {
                res.status(404).send({
                    message: 'Produk not found'
                });
            }
            res.send(produk);
        }
        ).catch(err => {
            res.status(500).send(err);
        }
        );
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = route;