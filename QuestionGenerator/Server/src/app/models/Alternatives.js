const {Schema, model} = require('mongoose');

const AltenativeSchema = new Schema({
    description: String,
    isCorrect: Boolean,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Alternative', AltenativeSchema);
