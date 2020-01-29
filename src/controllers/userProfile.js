const userProfileModel = require('../models/userProfileModel');

const validations = require('../utils/validations');

exports.index = async (req, res) => {
    try {
        const list = await userProfileModel.list();

        return res.status(200).json(list);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.show = async (req, res) => {
    
    const { id } = req.params;

    try {

        await validations.id(id);

        const profile = await userProfileModel.get(id);

        if (!profile)
            throw { message: 'Perfil inexistente ou excluido', status: 404 };
        
        return res.status(200).json(profile);
        
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.store = async (req, res) => {
    
    const { profile } = req.body;

    try {
        if (!profile)
            throw { message: 'profile não informado', status: 400 }; 
        
        await validations.string(profile.profileName, 'profileName');

        const result = await userProfileModel.create(profile);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.update = async (req, res) => {

    const { profile } = req.body;
    const { id } = req.params;

    try {
        if (!profile)
            throw { message: 'profile não informado', status: 400 };
        
        await validations.id(id);

        await validations.string(profile.profileName,'profileName');

        const result = await userProfileModel.update(profile, id);

        return res.status(201).json(result);
        
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};

exports.destroy = async (req, res) => {
    
    const { id } = req.params;

    try {
        await validations.id(id);

        if (!await userProfileModel.get(id))
            throw { message: 'Perfil inexistente ou excluido', status: 404 };
        
        const result = await userProfileModel.delete(id);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message || error });
    }
};