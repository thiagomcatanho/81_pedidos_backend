const productCategoryModel = require('../models/productCategoryModel');

exports.index = async (req, res) => {

    try {

        const list = await productCategoryModel.list();

        return res.status(200).json(list);

    } catch (error) {
        return res.status(error.status || 500).json({message: error.message || error});
    }
}

exports.show = async (req, res) => {

    const { id } = req.params; 
    
    try {

        if (!id) throw { message: 'Id não informado', status: 400 };
        if (isNaN(id)) throw { message: 'Id invalido', status: 400 };
        if (id < 0) throw { message: '`id` não pode ser menor ou igual 0', status: 400 };

        const category = await productCategoryModel.get(id);

        if(!category) throw { message: 'Categoria inexistente ou excluida', status: 404};

        return res.status(200).json(category);

    } catch (error) {
        return res.status(error.status || 500).json({message: error.message || error});
    }
}

exports.store = async (req, res) => {

    const { category } = req.body;

    try {

        if (!category) throw { message: '`category` não informada', status: 400 };
        if (!category.name || category.name.trim().length <= 0) throw { message: '`name` não informado ou vazio', status: 400 };

        const result = await productCategoryModel.create(category);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({message: error.message || error});
    }
}

exports.update = async (req, res) => {
    const { category } =  req.body;
    const { id } = req.params;

    try {

        if (!id) throw { message: 'Id não informado', status: 400 };
        if (isNaN(id)) throw { message: 'Id invalido', status: 400 };
        if (id < 0) throw { message: '`id` não pode ser menor ou igual 0', status: 400 };
        if (!category) throw { message: '`category` não informada', status: 400 };
        if (!category.name || category.name.trim().length <= 0) throw { message: '`name` não informado', status: 400 };

        if(!await productCategoryModel.get(id)) throw { message: 'Categoria inexistente ou excluida', status: 404};

        const result = await productCategoryModel.update(category, id);

        return res.status(201).json(result);
        
    } catch (error) {
        return res.status(error.status || 500).json({message: error.message || error});
    }
}

exports.destroy = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw { message: 'Id não informado', status: 400 };
        if (isNaN(id)) throw { message: 'Id invalido', status: 400 };
        if (id <= 0) throw { message: '`id` não pode ser menor ou igual 0', status: 400 };
        
        if(!await productCategoryModel.get(id)) throw { message: 'Categoria inexistente ou excluida', status: 404};

        const result = await productCategoryModel.delete(id);

        return res.status(200).json(result);
        
    } catch (error) {
        return res.status(error.status || 500).json({message: error.message || error});
    }
}