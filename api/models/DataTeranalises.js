const mongoose = require('mongoose');

const DataTeranalisesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statuses: Array,
    month: String,
    year: String
});

module.exports = mongoose.model('DataTeranalises', DataTeranalisesSchema);
