const router = require("express").Router()
const db = require("../database")

router.get("/delete/:postId", async (req, res) => {
    const email = req.session.user
    if (email) {
        const id = req.params.postId
        const resp = await db.findOne({ email }).exec()
        const index = resp.journals.findIndex(item => item.id === id)
        resp.journals.splice(index, 1)
        resp.save()
        res.redirect("/")
    } else {
        res.redirect("/login")
    }
})

module.exports = router