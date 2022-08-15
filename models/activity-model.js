const mysql = require("mysql");
const config = require("../config");
const connection = mysql.createConnection(config.db)
connection.connect()

exports.getAllActivity = (res) => {
    res.setHeader('Content-Type', 'application/json');
    connection.query('SELECT * FROM activity', (err, rows, fields) => {
        if (err) throw err
        console.log(rows[0].email);
        res.setHeader('Content-Type', 'application/json');
        var returndata = {
            status:"success",
            message:"success",
            data : rows
        }
        res.end(JSON.stringify(returndata));
    })
};

exports.getOneActivity = (res,params) => {
    res.setHeader('Content-Type', 'application/json');
    var id = params.id
    connection.query('SELECT * FROM activity WHERE id='+id, (err, rows, fields) => {
        if (err) throw err
        res.setHeader('Content-Type', 'application/json');
        console.log(rows.length)
        if(!rows.length){
            var msg = {
                "status": "Not Found",
                "message": "Activity with ID "+params.id+" Not Found",
                "data": {}
            }
            return res.end(JSON.stringify(msg));
        }
        var returndata = {
            status:"success",
            message:"success",
            data : rows
        }
        res.end(JSON.stringify(returndata));
    })
};

exports.insertActivity = (res, data) => {
    res.setHeader('Content-Type', 'application/json');
    var params = data;
    if(!params.title){
        var msg = {
            "status": "Bad Request",
            "message": "title cannot be null",
            "data": {}
        }
        return res.end(JSON.stringify(msg));
    }
    var sql = "INSERT INTO activity (email, title, created_at,updated_at) " +
        "values ('"+params.email+"','"+params.title+"',NOW(),NOW())";
    connection.query(sql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Gagal insert data!', error: err });
        }
        connection.query('SELECT created_at,updated_at,id,title,email FROM activity ORDER BY id DESC LIMIT 1', (err, rows, fields) => {
            if (err) throw err
            var returndata = {
                status:"success",
                message:"success",
                data : rows
            }
            res.end(JSON.stringify(returndata));
        })
    });
};

exports.deleteActivity = (res, params) => {
    res.setHeader('Content-Type', 'application/json');
    var thisDataDeleted = {};
    connection.query('SELECT * FROM activity WHERE id='+params.id, (err, rows, fields) => {
        thisDataDeleted = rows;
        if (err) throw err
        if(!thisDataDeleted.length){
            var msg = {
                "status": "Not Found",
                "message": "Activity with ID "+params.id+" Not Found",
                "data": {}
            }
            return res.end(JSON.stringify(msg));
        }
        connection.query('DELETE FROM activity WHERE id='+params.id, (err, rows, fields) => {
            if (err) throw err
            var returndata = {
                status:"success",
                message:"success",
                data : thisDataDeleted
            }
            res.end(JSON.stringify(returndata));
        })
    })
};

exports.updateActivity = (res, params) => {
    res.setHeader('Content-Type', 'application/json');
    if(!params.title){
        var msg = {
            "status": "Bad Request",
            "message": "title cannot be null",
            "data": {}
        }
        return res.end(JSON.stringify(msg));
    }
    var sql = "UPDATE activity SET " +
        "title='"+params.title+"' WHERE id="+params.id;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err
        if(!rows.affectedRows){
            var msg = {
                "status": "Not Found",
                "message": "Activity with ID "+params.id+" Not Found",
                "data": {}
            }
            return res.end(JSON.stringify(msg));
        }
        sql = 'SELECT * FROM activity WHERE id='+params.id;
        connection.query(sql, (err, rows, fields) => {
            if (err) throw err
            var returndata = {
                status:"success",
                message:"success",
                data : rows
            }
            res.end(JSON.stringify(returndata));
        })
    });
};