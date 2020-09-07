const UserRepository = require('../repositories/UserRepository');


module.exports = {
    async create(user){
        return await UserRepository.create(user);
    },

    async getAuthenticate(user){
        const result = await UserRepository.getAuthenticate(user);

        if(result.length === 0) return false;

        return (result)
    }
};