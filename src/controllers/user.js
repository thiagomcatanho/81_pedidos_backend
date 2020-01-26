const userModel = require('../models/userModel');
const crypto = require('crypto');

exports.login = async (req, res) => {
    const { login, password } = req.body;
    
    try {
        
        if (!login || login.trim().length <= 0) throw { message: 'Login não informado', status: 400 };
        if (!password || password.trim().length <= 0 ) throw { message: 'Senha não informada', status: 400 };

        const result = await userModel.login(login, crypto.createHmac('sha1', password).digest('hex')); 
        
        if (!result) throw { message: 'Login ou senha invalidos', status: 401 };

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || error);
    }
}