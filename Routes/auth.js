const router = require("express").Router();
const User = require("../Modules/Users");
const CryptoJS = require("cryptojs");
const jwt = require("jsonwebtoken");
//Register
router.post("/register", async(req, res) => {
    const newUser = new User({
        fristName: req.body.fristName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SCRIT_KEY
        ).toString(),
    });
    try {
        const Senduser = await newUser.save();
        res.status(200).json(Senduser);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Not Found your email or password");
        const Hpassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SCRIT_KEY
        );
        const Upassword = Hpassword.toString(CryptoJS.enc.Utf8);
        Upassword !== req.body.password &&
            res.status(401).json("not found your email or password");
        const Token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_KEY, { expiresIn: "5d" }
        );
        const { password, ...info } = user._doc;
        res.status(200).json({...info, Token });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;