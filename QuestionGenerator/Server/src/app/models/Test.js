const {Schema, model} = require('mongoose');

const TestSchema = new Schema({   
    title: String,
    isAvailable: Boolean,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    createAt:{
        type: Date,
        default: Date.now
    }    
});

module.exports = model('Test', TestSchema);