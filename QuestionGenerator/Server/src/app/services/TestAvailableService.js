const TestAvailableRepository = require('../repositories/TestAvailableRepository');

module.exports = {
    async create(item) {
        const questions = item.selecteds.map(x => x.questionId);
        const alternatives = item.selecteds.map(x => x.alternativeId);
        return await TestAvailableRepository.create(item.test, questions, alternatives, item.user, item.count);
    },

    async getAll() {
        return await TestAvailableRepository.getAll();
    }
}