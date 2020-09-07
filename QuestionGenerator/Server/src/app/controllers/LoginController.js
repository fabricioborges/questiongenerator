const UserService = require('../services/UserService');

module.exports = {
    async Authenticate(req, res){
        const {name, password} = req.body;

        const result = await UserService.getAuthenticate({name, password})

        if(result === false)
            res.status(401).send('Unauthorized')

        return res.json(result);
    }
};