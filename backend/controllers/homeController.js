const bab = require('../models/bab');
const nilai = require('../models/nilai');

async function home(req,res) {
    //find id
    const user = req.user;

    //find nilai
    const n = await nilai.find({idMahasiswa:user.id});
    //find notes
    const b = await bab.find();

    //respond with notes
    res.json({
        b: b,
        n: n
            });
}

module.exports = home;
