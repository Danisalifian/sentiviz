const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:String,
    password:String
});

module.exports = mongoose.model('Users', UsersSchema);
