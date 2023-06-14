const create = async (model,data) => {
    return await model.create(data);
}

const getAllData = async (model, data) => {
    return await model.find(data);
}

const getOneData = async (model, data) => {
    return await model.findOne(data);
}

const deleteData = async (model, data) => {
    return await model.findOneAndDelete(data);
}

const updateData = async (model, data) => {
    return await model.findOneAndUpdate({_id: data._id},{ $set: data},{new: true});
}
module.exports = {
    create,
    getAllData,
    getOneData,
    deleteData,
    updateData,
}