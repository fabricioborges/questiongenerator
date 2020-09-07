const { Schema, model } = require('mongoose');

const TestRunSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    count: Number,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    alternatives: [{
        type: Schema.Types.ObjectId,
        ref: 'Alternative'
    }]
})

module.exports = model('TestRun', TestRunSchema)