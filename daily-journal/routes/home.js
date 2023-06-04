const router = require("express").Router()
const db = require("../database")
let userAuth = false

router.get('/', async (req, res) => {
    const user = req.session.user
    if (user) {
        userAuth = true
        try {
            const data = await db.findOne({ email: user }).exec()
            if (data) {
                res.render("home", {
                    userAuth,
                    journalData: data.journals
                });
            } else {
                res.send("Something went wrong.")
            }
        } catch (error) {
            console.log("ERROR: " + error);
        }
    } else {
        userAuth = false
        res.redirect("/login")
    }
});

module.exports = router