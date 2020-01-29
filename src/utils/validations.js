
exports.id = async (id, field = null) => {

    if (!id) throw { message: `${field || 'id'} não informado`, status: 400 };
    if (isNaN(id)) throw { message: `${field || 'id'} invalido`, status: 400 };
    if (id <= 0) throw { message: `${field || 'id'} não pode ser menor ou igual a 0`, status: 400 };

    return true;
};

exports.rationalNumberGreaterOrEqualZero = async (value, field) => {

    if (!value || value.trim().length <= 0)
        throw { message: `'${field}' não informado ou vazio`, status: 400 };

    if (isNaN(value)) throw { message: `'${field}' informado não é um valor numerico`, status: 400 };

    if (value < 0) throw { message: `'${field}' não pode ser menor que 0`, status: 400 };

    return true;
};

exports.string = async (value, field) => {
    
    if (!value || value.trim().length <= 0) throw { message: `${field} não informado ou vazio`, status: 400 };
    
    return true;
};