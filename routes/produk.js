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

//get by nama
route.get('/:idProduk', (req, res) => {
    Produk.findOne({ idProduk: req.params.idProduk })
        .then(produk => {
            res.send(produk);
        }
        ).catch(err => {
            res.status(400).send(err);
        }
        );
}
);



route.put('/:idProduk', (req, res) => {
    //find and update
    Produk.findOneAndUpdate({ idProduk: req.params.idProduk }, {
        $set: {
            namaProduk: req.body.namaProduk,
            harga: req.body.harga,
            jenisProduk: req.body.jenisProduk
        }
    }, { new: true })
        .then(produk => {
            res.send(produk);
        }
        ).catch(err => {
            res.status(400).send(err);
        }
        );
}
);


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