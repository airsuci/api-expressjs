const {
    getAllActivity,
    getOneActivity,
    insertActivity,
    deleteActivity,
} = require('../models/activity-model.js');

exports.getAllActivity = (req, res) => {
    getAllActivity(res);
};