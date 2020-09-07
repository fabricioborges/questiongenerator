const Question = require('../models/Question');

module.exports = {
    async create(question) {
        const result = await Question.create(question);

        return result;
    },

    async getAll() {
        const result = await Question.find().populate('alternatives');

        return result;
    },

    async getById(id) {
        return await Question.findById(id).populate('alternatives');

    },

    async update(question){
        return await Question.findByIdAndUpdate({_id: question._id}, {title: question.title});
    },

    async delete(question){
        return await Question.findOneAndRemove({_id: question});
    }
};