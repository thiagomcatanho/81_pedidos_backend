const connection = require('../services/database').getConnection();

const table = 'user_profile';

exports.list = async () => {

    const list = await connection(table)
        .select(
            `id`,
            `profileName`
        )
        .where('visible', true);

    return list;
}

exports.get = async (id) => {

    const profile = await connection(table)
        .select(
            `id`,
            `profileName`
        )
        .where({
            id,
            visible: true
        })
        .first();

    return profile;
}

exports.create = async (profile) => {

    const result = connection(table)
        .insert({
            ...profile
        });

    return result;
}

exports.update = async (profile, id) => {

    const result = connection(table)
        .where({
            id,
            visible: true
        })
        .update({
            ...profile
        });

    return result;
}

exports.delete = async (id) => {

    const result = connection(table)
        .where({
            id
        })
        .update({
            visible: false
        })

    return result;
}