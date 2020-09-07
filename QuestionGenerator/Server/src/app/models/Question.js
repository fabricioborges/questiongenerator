const {Schema, model} = require('mongoose');

const QuestionSchema = new Schema({
    title: String,
    alternatives: [{
        type: Schema.Types.ObjectId,
        ref: 'Alternative'
    }],   
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Question', QuestionSchema);