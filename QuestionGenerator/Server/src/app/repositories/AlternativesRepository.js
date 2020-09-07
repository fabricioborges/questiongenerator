const Alternatives = require('../models/Alternatives');

module.exports = {
    async create(alternatives) {
        const result = await Alternatives.create(alternatives);

        return result;
    },

    async update(alternatives) {
        try {
            var result;
            for (alternative of alternatives) {
                const id = alternative._id;

                const query = {'_id': id};
                const updateData = {
                    description: alternative.description,
                    isCorrect: alternative.isCorrect
                }

                result = await Alternatives.update(query, updateData);
            }

            return result;
        } catch (error) {
            return false;
        }
    },

    async delete(alternatives){      
        return await Alternatives.deleteMany(alternatives);
    }

}