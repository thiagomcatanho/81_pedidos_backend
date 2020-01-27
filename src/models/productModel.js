const connection = require('../services/database').getConnection();

const table = 'products';

exports.list = async () => {

    const list = await connection(table)
        .select(
            `products.id`,
            `productName`,
            `productDescription`,
            `stock`,
            `price`,
            `product_category.categoryName`
        )
        .innerJoin(`product_category`, `product_category.id`, `${table}.categoryId`)
        .where({
            "products.visible": true
        })
        .orderBy(`productName`);

    return list;
}

exports.get = async (id) => {

    const product = await connection(table)
        .select(
            `products.id`,
            `productName`,
            `productDescription`,
            `stock`,
            `price`,
            `product_category.categoryName`
        )
        .innerJoin(`product_category`, `product_category.id`, `${table}.categoryId`)
        .where({
            "products.id": id,
            "products.visible": true
        })
        .first();

    return product;
}

exports.create = async (product) => {

    const result = await connection(table)
        .insert({
            ...product
        });

    return result;
}

exports.update = async (product, id) => {

    const result = await connection(table)
        .where({
            id,
            visible: true
        })
        .update({
            ...product
        });
    
    return result;
}

exports.delete = async (id) => {

    const result = await connection(table)
        .where({
            id
        })
        .update({
            visible: false
        });

    return result;
}