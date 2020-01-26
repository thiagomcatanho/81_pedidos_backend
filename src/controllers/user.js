const crypto = require('crypto');

const userModel = require('../models/userModel');
const authMiddleware = require('../middleware/auth'); 

exports.login = async (req, res) => {
    const { login, password } = req.body;
    
    try {

        if (!login || login.trim().length <= 0) throw { message: 'Login não informado', status: 400 };
        if (!password || password.trim().length <= 0 ) throw { message: 'Senha não informada', status: 400 };

        const user = await userModel.login(login, crypto.createHmac('sha1', password).digest('hex')); 
        
        if (!user) throw { message: 'Login ou senha invalidos', status: 401 };

        const token = await authMiddleware.sign(user);

        return res.status(200).json({user, token});

    } catch (error) {
        return res.status(error.status || 500).json({message: error.message || error});
    }
}