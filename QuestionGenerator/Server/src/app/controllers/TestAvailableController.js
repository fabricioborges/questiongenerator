const TestAvailableService = require('../services/TestAvailableService');
const TestService = require('../services/TestService');

module.exports = {
    async index(req, res){
        const result = await TestService.getAvailable();

        return res.json(result);
    },

    async store(req, res){
        const { testId, selecteds, userId, count } = req.body;

        const testObject = { test: testId, selecteds, user: userId, count}

        const result = await TestAvailableService.create(testObject)

        return res.json(result);
    },

    async getAll(req, res){
        const result = await TestAvailableService.getAll();

        return res.json(result);
    }
};