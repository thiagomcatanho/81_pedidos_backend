const jwt = require('jsonwebtoken');
const { authSecretKey } = require('../config/keys');

exports.authenticate = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Nenhum token informado' });

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2)
        return res.status(400).send({ error: 'Token Error' });

    const [scheme, token] = parts;

    if (scheme != 'Bearer')
        return res.status(400).send({ error: 'Token mal formatado' })

    jwt.verify(token, authSecretKey, (err, decoded) => {
        if (err)
            return res.status(403).send({ error: 'Token invalido' });

        req.userId = decoded.userId;

        return next();
    });

}

exports.sign = async (user) => {

    const token = jwt.sign({
        userId: user.id
    }, authSecretKey, { expiresIn: '2 days' });

    return token;
}