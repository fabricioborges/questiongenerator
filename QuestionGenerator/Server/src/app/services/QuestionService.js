const QuestionRepository = require('../repositories/QuestionRepository');
const AlternativeRepository = require('../repositories/AlternativesRepository');

module.exports = {
    async create(request) {

        const resultAlternative = await AlternativeRepository.create(request.alternatives);

        const questObject = { title: request.title, alternatives: [] };

        resultAlternative.map(x => {
            questObject.alternatives.push(x._id)
        });

        return await QuestionRepository.create(questObject);
    },

    async getAll() {
        return await QuestionRepository.getAll();
    },

    async getById(id) {
        return await QuestionRepository.getById(id);
    },

    async update(request) {
        const alternatives = request.alternatives;
    
        await AlternativeRepository.update(alternatives);

        const questObject = { _id: request._id, title: request.title, alternatives };

        return await QuestionRepository.update(questObject);
    },

    async delete(question) {
        const id = question.id;
   
        try {            
            await QuestionRepository.getById(id);
            await AlternativeRepository.delete(question);

            await QuestionRepository.delete(id);
        } catch (error) {

        }        
    }
}