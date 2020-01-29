const productModel = require('../models/productModel');
const productCategoryModel = require('../models/productCategoryModel');

const validations = require('../utils/validations');

exports.index = async (req, res) => {

    try {
        const list = await productModel.list();

        return res.status(200).json(list);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.show = async (req, res) => {

    const { id } = req.params;

    try {
        await validations.id(id);

        const product = await productModel.get(id);

        if (!product)
            throw { message: 'Produto inexistente ou excluido', status: 404 };

        return res.status(200).json(product);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.store = async (req, res) => {

    const { product } = req.body;

    try {

        if (!product)
            throw { message: '`product` não informada', status: 400 };

        await validations.string(product.productName, 'productName');

        await validations.string(product.productDescription, 'productDescription');

        await validations.rationalNumberGreaterOrEqualZero(product.stock, 'stock');

        await validations.rationalNumberGreaterOrEqualZero(product.price, 'price');

        await validations.id(product.categoryId, 'categoryId');

        if (!await productCategoryModel.get(product.categoryId))
            throw { message: 'Categoria inexistente ou excluida', status: 404 };

        const result = await productModel.create(product);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.update = async (req, res) => {

    const { product } = req.body;
    const { id } = req.params;

    try {

        await validations.id(id);

        if (!product)
            throw { message: '`product` não informada', status: 400 };

        await validations.string(product.productName, 'productName');

        await validations.string(product.productDescription, 'productDescription');

        await validations.rationalNumberGreaterOrEqualZero(product.stock, 'stock');

        await validations.rationalNumberGreaterOrEqualZero(product.price, 'price');

        await validations.id(product.categoryId, 'categoryId');

        if (!await productCategoryModel.get(product.categoryId))
            throw { message: 'Categoria inexistente ou excluida', status: 404 };

        if (!await productModel.get(id))
            throw { message: 'Produto inexistente ou excluido', status: 404 };

        const result = await productModel.update(product, id);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.destroy = async (req, res) => {

    const { id } = req.params;

    try {

        await validations.id(id);

        if (!await productModel.get(id))
            throw { message: 'Produto inexistente ou excluido', status: 404 };

        const result = await productModel.delete(id);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};