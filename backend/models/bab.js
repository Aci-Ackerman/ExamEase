const mongoose = require("mongoose");

const babScheme = new mongoose.Schema({
    idBab: String,
    idSoal: String,
    nama: String,
    soal: String
});

const bab = mongoose.model('bab', babScheme);

module.exports = bab;