const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    url: String, 
    public_id: String,
    file_name: String
});

module.exports = mongoose.model("Document", documentSchema);