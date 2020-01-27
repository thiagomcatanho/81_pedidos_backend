const productModel = require('../models/productModel');
const productCategoryModel = require('../models/productCategoryModel');

exports.index = async (req, res) => {

    try {
        const list = await productModel.list();

        return res.status(200).json(list);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.show = async (req, res) => {

    const { id } = req.params;

    try {
        if (!id) throw { message: 'Id não informado', status: 400 };
        if (isNaN(id)) throw { message: 'Id invalido', status: 400 };
        if (id <= 0) throw { message: '`id` não pode ser menor ou igual a 0', status: 400 };

        const product = await productModel.get(id);

        if (!product) throw { message: 'Produto inexistente ou excluido', status: 404 };

        return res.status(200).json(product);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.store = async (req, res) => {

    const { product } = req.body;

    try {

        if (!product) throw { message: '`product` não informada', status: 400 };

        if (!product.productName || product.productName.trim().length <= 0)
            throw { message: '`productName` não informado ou vazio', status: 400 };

        if (!product.productDescription || product.productDescription.trim().length <= 0)
            throw { message: '`productDescription` não informado ou vazio', status: 400 };

        if (!product.stock || product.stock.trim().length <= 0)
            throw { message: '`stock` não informado ou vazio', status: 400 };

        if (isNaN(product.stock)) throw { message: '`stock` informado não é um valor numerico', status: 400 };

        if (product.stock < 0) throw { message: '`stock` não pode ser menor que 0', status: 400 };

        if (!product.price || product.price.trim().length <= 0)
            throw { message: '`price` não informado ou vazio', status: 400 };

        if (isNaN(product.price)) throw { message: '`price` informado não é um valor numerico', status: 400 };

        if (product.price < 0) throw { message: '`price` não pode ser menor que 0', status: 400 };

        if (!product.categoryId || product.categoryId.trim().length <= 0)
            throw { message: '`categoryId` não informado ou vazio', status: 400 };

        if (isNaN(product.categoryId)) throw { message: '`categoryId` informado não é um valor numerico', status: 400 };

        if (product.categoryId <= 0) throw { message: '`categoryId` não pode ser menor ou igual a 0', status: 400 };

        if (!await productCategoryModel.get(product.categoryId)) throw { message: 'Categoria inexistente ou excluida', status: 404 };

        const result = await productModel.create(product);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.update = async (req, res) => {

    const { product } = req.body;
    const { id } = req.params;

    try {

        if (!id) throw { message: 'Id não informado', status: 400 };
        if (isNaN(id)) throw { message: 'Id invalido', status: 400 };
        if (id <= 0) throw { message: '`id` não pode ser menor ou igual a 0', status: 400 };

        if (!product) throw { message: '`product` não informada', status: 400 };

        if (!product.productName || product.productName.trim().length <= 0)
            throw { message: '`productName` não informado ou vazio', status: 400 };

        if (!product.productDescription || product.productDescription.trim().length <= 0)
            throw { message: '`productDescription` não informado ou vazio', status: 400 };

        if (!product.stock || product.stock.trim().length <= 0)
            throw { message: '`stock` não informado ou vazio', status: 400 };

        if (isNaN(product.stock)) throw { message: '`stock` informado não é um valor numerico', status: 400 };

        if (product.stock < 0) throw { message: '`stock` não pode ser menor que 0', status: 400 };

        if (!product.price || product.price.trim().length <= 0)
            throw { message: '`price` não informado ou vazio', status: 400 };

        if (isNaN(product.price)) throw { message: '`price` informado não é um valor numerico', status: 400 };

        if (product.price < 0) throw { message: '`price` não pode ser menor que 0', status: 400 };

        if (!product.categoryId || product.categoryId.trim().length <= 0)
            throw { message: '`categoryId` não informado ou vazio', status: 400 };

        if (isNaN(product.categoryId)) throw { message: '`categoryId` informado não é um valor numerico', status: 400 };

        if (product.categoryId <= 0) throw { message: '`categoryId` não pode ser menor ou igual a 0', status: 400 };

        if (!await productCategoryModel.get(product.categoryId)) throw { message: 'Categoria inexistente ou excluida', status: 404 };

        if (!await productModel.get(id)) throw { message: 'Produto inexistente ou excluido', status: 404 };

        const result = await productModel.update(product, id);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}

exports.destroy = async (req, res) => {

    const { id } = req.params;

    try {

        if (!id) throw { message: 'Id não informado', status: 400 };
        if (isNaN(id)) throw { message: 'Id invalido', status: 400 };
        if (id <= 0) throw { message: '`id` não pode ser menor ou igual a 0', status: 400 };

        if (!await productModel.get(id)) throw { message: 'Produto inexistente ou excluido', status: 404 };

        const result = await productModel.delete(id);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
}