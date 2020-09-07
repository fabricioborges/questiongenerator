const TestRepository = require('../repositories/TestRepository');
const QuestionRepository = require('../repositories/QuestionRepository');

module.exports = {
    async create(test){
        return await TestRepository.create(test);
    },

    async getAll(){
        return await TestRepository.getAll();
    },

    async getById(id){
        const result = await TestRepository.getbyId(id);
        
        const questions  = [];

        for(questionsId of result.questions){
            const question = await QuestionRepository.getById(questionsId);
            questions.push(question);
        }

        result.questions = questions

        return result;
    },

    async update(test){
        const testObject = { _id: test._id, title: test.title, isAvailable: test.isAvailable, questions: test.questions}

        const result = await TestRepository.update(testObject)

        return result;
    },

    async delete(test){
        const id = test.id;

        return await TestRepository.delete(id);
    },

    async getAvailable(){
        return await TestRepository.getAvailable();
    }
}