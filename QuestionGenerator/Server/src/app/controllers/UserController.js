const UserService = require('../services/UserService');

module.exports = {
    async index(req, res) {

    },

    async store(req, res) {
        const { name, password, isAdmin} = req.body;

        const result = await UserService.create({name, password, isAdmin});

        return res.json(result);
    }
};