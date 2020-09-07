const QuestionService = require('../services/QuestionService');

module.exports = {
    async index(req, res) {
        if(!req.params.id){
            const result = await QuestionService.getAll();

            return res.json(result);
        } else {
            const { id } = req.params;
            const result = await QuestionService.getById(id)

            return res.json(result);
        }        
    },

    async store(req, res){
        const request = req.body;
        
        const result = await QuestionService.create(request);

        return res.json(result);
    },

    async edit(req, res){
        const request = req.body;

        const result = await QuestionService.update(request);

        return res.json(result);
    },

    async delete(req, res){
        const id = req.body;
        const result = await QuestionService.delete(id);

        return res.json(result);
    }
}