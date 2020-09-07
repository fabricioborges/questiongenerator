const TestRun = require('../models/TestRun');

module.exports = {
    async create(test, questions, alternatives, user, count){
        console.log(user);
        return await TestRun.create({ test, user, count, questions, alternatives});
    },

    async getAll(){
        return await TestRun.find().populate('test').populate('user');
    }
}