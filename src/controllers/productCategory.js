const productCategoryModel = require('../models/productCategoryModel');
const validations = require('../utils/validations');


exports.index = async (req, res) => {

    try {

        const list = await productCategoryModel.list();

        return res.status(200).json(list);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.show = async (req, res) => {

    const { id } = req.params;

    try {

        await validations.id(id);

        const category = await productCategoryModel.get(id);

        if (!category)
            throw { message: 'Categoria inexistente ou excluida', status: 404 };

        return res.status(200).json(category);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.store = async (req, res) => {

    const { category } = req.body;

    try {

        if (!category)
            throw { message: '`category` não informada', status: 400 };

        await validations.string(category.name, 'categoryName');

        const result = await productCategoryModel.create(category);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.update = async (req, res) => {
    const { category } = req.body;
    const { id } = req.params;

    try {

        if (!category)
            throw { message: '`category` não informada', status: 400 };

        await validations.id(id);

        await validations.string(category.name, 'categoryName');

        if (!await productCategoryModel.get(id))
            throw { message: 'Categoria inexistente ou excluida', status: 404 };

        const result = await productCategoryModel.update(category, id);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.destroy = async (req, res) => {
    const { id } = req.params;

    try {

        await validations.id(id);

        if (!await productCategoryModel.get(id))
            throw { message: 'Categoria inexistente ou excluida', status: 404 };

        const result = await productCategoryModel.delete(id);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}