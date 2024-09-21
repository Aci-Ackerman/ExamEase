const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign up API
// request: json => password: String, nama: String, status: String(enum = [dosen, mahasiswa])
// response: json => id: String
async function signup(req, res) {
    try {
        const { password, nama, status} = req.body;
    
        // Hash password
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        //process.env.SALT
        //

        // Create id 
        while (true) {
            const idLength = 8;
            var randomnumber = "";
            for (var i=0; i<idLength; i++) {
                var rnum = Math.floor(Math.random()*10);
                randomnumber += rnum;
            }

            if (!await User.findOne({randomnumber})) {
                // Create user with the data
                await User.create({ id: randomnumber, password: hashedPassword, nama: nama, status: status});
                break;
            }
        }

        // respond
        res.json({id: randomnumber});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

// Login API
// request: json => id: String, password: String
// response(login berhasil): cookie
// response(login gagal): error
async function login(req, res) {
    try {
        const { id, password } = req.body;

        // find user
        const user = await User.findOne({id: id});
        if (!user) return res.sendStatus(404);

        // match password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.sendStatus(401);

        // create jwt token
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign({ 
            sub: user._id,
            exp: exp,
        }, process.env.SECRET_JWT);

        // Set cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        })

        //res.sendStatus(200);   
        res.json({user:user});
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}

// Sample check auth API
function checkAuth(req, res) {
    try {
        console.log(req.user);
        res.sendStatus(200);
    } catch (error) {
        conxsole.log(error);
        res.sendStatus(400);
    }
} 

// Logout API
// response: clearCookie
function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


// Debugging purposes
async function showAllUsers(req, res) {
    try {
        const users = await User.find();

        res.json({users});
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function checkUser(req, res) {
    try {
        const {id} = req.body;

        // find user
        const user = await User.findOne({id: id});

        res.json({user});    
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }

}

async function delUser(req, res) {
    try {
        const {id} = req.body;

        // delete user
        await User.deleteOne({id: id});
        const user = await User.findOne({id});
    
        res.json({user: user});
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }

}

module.exports = {
    signup,
    login,
    checkAuth,
    logout,
    checkUser,
    delUser,
    showAllUsers,
};