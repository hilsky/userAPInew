const mongoose = require('mongoose');


const ProdukSchema = new mongoose.Schema({
    idProduk: {
        type: String,
        required: true,
    },
    namaProduk: {
        type: String,
        required: true,
    },
    harga : {
        type: String,
        required: true,
    },
    jenisProduk: {
        type: String,
        required: true,
    }
})


exports.Produk = new mongoose.model('Produk', ProdukSchema);
