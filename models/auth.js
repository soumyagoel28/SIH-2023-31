const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    phone: Number
})

module.exports = mongoose.model('camping',campSchema);