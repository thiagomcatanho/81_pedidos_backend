const connection = require('../services/database').getConnection();

const table = 'users';

exports.login = async (login, password) => {
    const user = await connection(table)
        .select(
            `users.id`,
            `users.userName`,
            `user_profile.profileName`
        )
        .where({
            userLogin: login,
            userPassword: password,
            "users.visible": true
        })
        .innerJoin('user_profile', 'user_profile.id', 'users.id')
        .first();
    
    return user;
}