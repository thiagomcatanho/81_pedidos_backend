const connection = require('../services/database').getConnection();

const table = 'product_category';

exports.list = async () => {

    const list = await connection(table)
        .select(
            `id`,
            `categoryName`
        )
        .where(`${table}.visible`, true);

    return list;
}

exports.get = async (id) => {

    const category = await connection(table)
        .select(
            `id`,
            `categoryName`
        )
        .where({
            id,
            visible: true
        })
        .first();

    return category;
}

exports.create = async (category) => {

    const result = connection(table)
        .insert({
            categoryName: category.name
        });

    return result;
}

exports.update = async (category, id) => {

    const result = connection(table)
        .where({
            id,
            visible: true
        })
        .update({
            categoryName: category.name
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