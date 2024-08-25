const mongoose = require("mongoose");

const nilaiScheme = new mongoose.Schema({
    idMahasiswa: String,
    idSoal: String,
    nilai: String
});

const nilai = mongoose.model('nilai', nilaiScheme);

module.exports = nilai;