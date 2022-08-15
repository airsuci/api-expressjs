const mysql = require("mysql");
const config = require("../config");
const connection = mysql.createConnection(config.db)
connection.connect()

exports.getAllTodo = (res,activityGroupId) => {
    res.setHeader('Content-Type', 'application/json');
    var sql = ''
    if(activityGroupId !=''){
        sql = 'SELECT * FROM todo WHERE activity_group_id = '+activityGroupId
    }else{
        sql = 'SELECT * FROM todo';
    }
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err
        res.setHeader('Content-Type', 'application/json');
        var returndata = {
            status: "success",
            message: "success",
            data: rows
        }
        res.end(JSON.stringify(returndata));
    })
};

exports.getOneTodo = (res, params) => {
    res.setHeader('Content-Type', 'application/json');
    var id = params.id
    connection.query('SELECT * FROM todo WHERE id=' + id, (err, rows, fields) => {
        if (err) throw err
        res.setHeader('Content-Type', 'application/json');
        if (!rows.length) {
            var msg = {
                "status": "Not Found",
                "message": "Todo with ID " + params.id + " Not Found",
                "data": {}
            }
            return res.end(JSON.stringify(msg));
        }
        var returndata = {
            status: "success",
            message: "success",
            data: rows
        }
        res.end(JSON.stringify(returndata));
    })
};

exports.insertTodo = (res, data) => {
    res.setHeader('Content-Type', 'application/json');
    var params = data;
    if (!params.title) {
        var msg = {
            "status": "Bad Request",
            "message": "title cannot be null",
            "data": {}
        }
        return res.end(JSON.stringify(msg));
    }
    if (!params.activity_group_id) {
        var msg = {
            "status": "Bad Request",
            "message": "activity_group_id cannot be null",
            "data": {}
        }
        return res.end(JSON.stringify(msg));
    }
    var sql = "INSERT INTO todo (title,activity_group_id,is_active,priority, created_at,updated_at) " +
        "values ('" + params.title + "','" + params.activity_group_id + "',1,'very-high',NOW(),NOW())";
    connection.query(sql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({message: 'Gagal insert data!', error: err});
        }
        console.log(rows);
        connection.query('SELECT created_at,updated_at,id,title,activity_group_id,is_active,priority FROM todo ORDER BY id DESC LIMIT 1', (err, rows, fields) => {
            if (err) throw err
            var returndata = {
                status: "success",
                message: "success",
                data: rows
            }
            res.end(JSON.stringify(returndata));
        })
    });
};

exports.deleteTodo = (res, params) => {
    res.setHeader('Content-Type', 'application/json');
    var thisDataDeleted = {};
    connection.query('SELECT * FROM todo WHERE id=' + params.id, (err, rows, fields) => {
        thisDataDeleted = rows;
        if (err) throw err
        if (!thisDataDeleted.length) {
            var msg = {
                "status": "Not Found",
                "message": "Todo with ID " + params.id + " Not Found",
                "data": {}
            }
            return res.end(JSON.stringify(msg));
        }
        connection.query('DELETE FROM todo WHERE id=' + params.id, (err, rows, fields) => {
            if (err) throw err
            var returndata = {
                status: "success",
                message: "success",
                data: thisDataDeleted
            }
            res.end(JSON.stringify(returndata));
        })
    })
};

exports.updateTodo = (res, params) => {
    res.setHeader('Content-Type', 'application/json');
    if (!params.title) {
        var msg = {
            "status": "Bad Request",
            "message": "title cannot be null",
            "data": {}
        }
        return res.end(JSON.stringify(msg));
    }
    if(params.title){
        var sql = "UPDATE todo SET " +
            "title='" + params.title + "' WHERE id=" + params.id;
    }

    if(params.status){
        var sql = "UPDATE todo SET " +
            "is_active='" + params.is_active + "' WHERE id=" + params.id;
    }

    connection.query(sql, (err, rows, fields) => {
        if (err) throw err
        if (!rows.affectedRows) {
            var msg = {
                "status": "Not Found",
                "message": "Todo with ID " + params.id + " Not Found",
                "data": {}
            }
            return res.end(JSON.stringify(msg));
        }
        sql = 'SELECT * FROM todo WHERE id=' + params.id;
        connection.query(sql, (err, rows, fields) => {
            if (err) throw err
            var returndata = {
                status: "success",
                message: "success",
                data: rows
            }
            res.end(JSON.stringify(returndata));
        })
    });
};