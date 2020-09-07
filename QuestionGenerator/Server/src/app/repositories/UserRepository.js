const User = require('../models/User');

module.exports  ={
    async create(user){
        return await User.create(user);
    },

    async getAuthenticate(user){
        return await User.find({name: user.name, password: user.password});
    }
};