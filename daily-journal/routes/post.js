const router = require("express").Router()
const db = require("../database")
let userAuth = false

router.get("/post/:postName", async (req, res) => {
    const user = req.session.user
    if (user) {
        const data = await db.findOne({ email: user }).exec()
        if (data) {
            userAuth = true
            const journals = data.journals
            journals.forEach(element => {
                if (element._id == req.params.postName) {
                    res.render("post", {
                        userAuth,
                        postTitle: element.title,
                        postBody: element.body
                    });
                }
            });
        } else {
            userAuth = false
            res.render("post", {
                userAuth,
                postTitle: "404 Page Not Found",
                postBody: "Page Doesn't exist"
            });
        }
    } else {
        res.redirect("/login")
    }
});

module.exports = router