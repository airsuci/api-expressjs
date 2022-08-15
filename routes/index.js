var express = require('express');
const mysql = require("mysql");
const config = require("../config");
var router = express.Router();
const connection = mysql.createConnection(config.db)
connection.connect()
const {
    getAllActivity,
    getOneActivity,
    insertActivity,
    deleteActivity,
    updateActivity,
} = require('../models/activity-model.js');

const {
    getAllTodo,
    getOneTodo,
    insertTodo,
    deleteTodo,
    updateTodo,
} = require('../models/todo-model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express oke'});
});

router.get('/activity-groups', function (req, res, next) {
    getAllActivity(res);
});

router.get('/activity-groups/:id', function (req, res, next) {
    var params = req.params;
    getOneActivity(res, params);
});

router.post('/activity-groups', function (req, res, next) {
    var params = req.body;
    insertActivity(res, params);
});

router.delete('/activity-groups/:id', function (req, res, next) {
    var params = req.params;
    deleteActivity(res, params);
});

router.patch('/activity-groups/:id', function (req, res, next) {
    var pars = req.params;
    var pars2 = req.body;
    let params = {
        ...pars,
        ...pars2
    };
    updateActivity(res, params);
});

router.get('/todo-items', function (req, res, next) {
    console.log(req.query.activity_group_id)
    //res.end(req.query);return;
    var activityGroupId = (req.query.activity_group_id)?req.query.activity_group_id:'';
    getAllTodo(res,activityGroupId);
});

router.get('/todo-items/:id', function (req, res, next) {
    var params = req.params;
    getOneTodo(res, params);
});

router.post('/todo-items', function (req, res, next) {
    var params = req.body;
    insertTodo(res, params);
});

router.delete('/todo-items/:id', function (req, res, next) {
    var params = req.params;
    deleteTodo(res, params);
});

router.patch('/todo-items/:id', function (req, res, next) {
    var pars = req.params;
    var pars2 = req.body;
    let params = {
        ...pars,
        ...pars2
    };
    updateTodo(res, params);
});

module.exports = router;
