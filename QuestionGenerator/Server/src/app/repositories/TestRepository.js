const Test = require('../models/Test');

module.exports = {
    async create(test) {
        const result = await Test.create(test);

        return result;
    },

    async getAll() {
        return await Test.find();
    },

    async getbyId(id) {
        const result = await Test.findById(id);

        return result;
    },

    async update(test) {
        return await Test.findByIdAndUpdate({ _id: test._id }, { title: test.title, isAvailable: test.isAvailable, questions: test.questions });
    },

    async delete(test) {
        return await Test.findOneAndRemove({ _id: test });
    },

    async getAvailable() {
        return await Test.find({ isAvailable: true });
    }
};