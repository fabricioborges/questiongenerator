const TestService = require('../services/TestService');

module.exports = {
    async index(req, res) {
        if (!req.params.id) {
            const result = await TestService.getAll();

            return res.json(result);
        } else {
            const { id } = req.params;
            const result = await TestService.getById(id)

            return res.json(result);
        }
    },

    async store(req, res) {
        const { title, questions, isAvailable } = req.body;

        const testObject = { title, questions, isAvailable }

        const result = await TestService.create(testObject);

        res.json(result);
    },

    async edit(req, res){
        const request = req.body;

        const result = await TestService.update(request);

        return res.json(result);
    },

    async delete(req, res){
        const id = req.body;
        const result = await TestService.delete(id);

        return res.json(result);
    }
}