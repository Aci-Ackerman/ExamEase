const bab = require('./models/bab');
const nilai = require('./models/nilai');

async function home(req,res) =>{
    //find id
    const user = req.params.id;

    //find nilai
    const n = await nilai.find({idMahasiswa:user});
    //find notes
    const b = await bab.find();

    //respond with notes
    res.json({
        b: b,
        n: n
            });
}

module.exports = home;
