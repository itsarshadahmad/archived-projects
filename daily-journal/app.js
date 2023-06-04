const express = require("express");
const session = require("express-session")
const helmet = require("helmet")

// Routes
const navLinksRoute = require("./routes/navLinks")
const homeRoute = require("./routes/home")
const composeRoute = require("./routes/compose")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const deletePostRoute = require("./routes/deletePost")

const app = express();
const PORT = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())
app.use(helmet())
app.use(session({
  secret: 'cookie jar',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))

app.use(homeRoute)
app.use(navLinksRoute)
app.use(composeRoute)
app.use(authRoute)
app.use(postRoute)
app.use(deletePostRoute)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));