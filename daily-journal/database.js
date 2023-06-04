const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/JournalDB");

const journalSchema = new mongoose.Schema([{
    name: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, journals: [{
        title: {
            type: String,
            required: true
        }, body: {
            type: String,
            required: true
        }
    }]
}]);

const JournalDB = mongoose.model("User", journalSchema);

module.exports = JournalDB