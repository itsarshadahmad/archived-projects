const router = require("express").Router()
const db = require("../database")
let warning = false
let userAuth = false

router.get('/compose', (req, res) => {
    const user = req.session.user
    if (user) {
        userAuth = true
        res.render("compose", { warning, userAuth });
        warning = false
    } else {
        userAuth = false
        res.redirect("/login")
    }
});

router.post("/compose", async (req, res) => {
    const user = req.session.user
    const title = req.body.postTitle
    const body = req.body.postBody

    if (user) {
        if (title && body) {
            await db.updateOne({ email: user }, { $addToSet: { journals: [{ title, body }] } }).exec()
            res.redirect("/");
        } else {
            res.redirect("/compose")
        }
    } else {
        res.redirect("/login")
    }
});

module.exports = router