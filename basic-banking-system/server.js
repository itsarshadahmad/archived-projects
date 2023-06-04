const express = require("express");
const mongoose = require("mongoose");
const db = require("./database");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 3000;

const user = process.env.USER;
const password = process.env.PASSWORD;

const MONGOURL = `mongodb+srv://${user}:${password}@atlascluster.fqdnsub.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGOURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
	res.render("home");
});

app.get("/users", async (req, res) => {
	const data = await db.find({});
	res.render("allUsers", { data });
});

app.get("/user/:account", async (req, res) => {
	const { account } = req.params;
	const user = await db.findOne({ account });
	const data = await db.find({});
	res.render("user", { user, data });
});

app.post("/transfer", async (req, res) => {
	const { sender, receiver, amount } = req.body;

	const senderProfile = await db.findOne({ account: sender });
	const currentSenderBalance = senderProfile.balance - amount;

	await db.findOneAndUpdate(
		{ account: sender },
		{ balance: currentSenderBalance }
	);

	const receiverProfile = await db.findOne({ name: receiver });
	const currentReceiverBalance =
		receiverProfile.balance + Number.parseInt(amount);

	await db.findOneAndUpdate(
		{ name: receiver },
		{ balance: currentReceiverBalance }
	);

	res.redirect("/users");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("*", (req, res) => {
	res.send("<h1>404 Page Not Fount!</h1>");
});

app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`);
});
