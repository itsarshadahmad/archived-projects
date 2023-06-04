const mongoose = require("mongoose");

mongoose.connection.on("connected", () =>
	console.log("Successfully connected to Mongodb")
);

const BankSchema = new mongoose.Schema({
	name: String,
	account: Number,
	profile: String,
	dob: Date,
	balance: Number,
	email: String,
	gender: String,
	address: String,
	contactNumber: Number,
});

const BankModel = mongoose.model("User", BankSchema);

module.exports = BankModel;
