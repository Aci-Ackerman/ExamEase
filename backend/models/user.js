const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["dosen", "mahasiswa"],
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;