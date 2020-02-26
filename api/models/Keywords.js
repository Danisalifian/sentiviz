const mongoose = require('mongoose');

const KeywordsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    keyword:String
});

module.exports = mongoose.model('Keywords', KeywordsSchema);
