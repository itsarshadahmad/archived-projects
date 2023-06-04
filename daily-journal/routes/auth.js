const router = require("express").Router()
const db = require("../database")
const bcrypt = require("bcrypt")

const saltRounds = 10
let userAuth = false

router.get("/signup", (req, res) => {
    if (req.session.user) {
        userAuth = true
        res.redirect("/")
    } else {
        userAuth = false
        res.render("signup", { userAuth })
    }
})

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body

    if (req.session.user) {
        userAuth = true
        res.redirect("/")
    } else {
        userAuth = false
        if (email && password && name) {
            const dbResult = await db.find({ email: email }).exec()
            if (dbResult.length === 0) {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (!err) {
                        const data = new db({
                            name: name,
                            email: email,
                            password: hash
                        });
                        data.save(err => {
                            if (err) {
                                console.log(err)
                                res.send("Something went wrong please try again")
                            } else {
                                req.session.user = email
                                req.session.save()
                                res.redirect("/")
                            }
                        })
                    }
                })
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/signup")
        }
    }
})

router.get("/login", (req, res) => {
    if (req.session.user) {
        userAuth = true
        res.redirect("/")
    } else {
        userAuth = false
        res.render("login", { userAuth })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (req.session.user) {
        userAuth = true
        res.redirect("/")
    } else {
        userAuth = false
        if (email && password) {
            const dbResult = await db.find({ email }).exec()
            if (dbResult.length === 0) {
                res.redirect("/signup")
            } else {
                dbResult.forEach(item => {
                    if (item.email === email) {
                        const hash = item.password
                        bcrypt.compare(password, hash, function (err, result) {
                            if (!err) {
                                // result returns boolean
                                if (result) {
                                    req.session.user = email
                                    req.session.save()
                                    res.redirect("/")
                                } else {
                                    res.redirect("/signup")
                                }
                            } else {
                                res.redirect("/signup")
                            }
                        });
                    } else {
                        res.redirect("/signup")
                    }
                })
            }
        } else {
            res.redirect("/login")
        }
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    userAuth = false
    res.redirect("/login")
})

module.exports = router