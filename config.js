const config = {
    db: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DBNAME,
        port:process.env.MYSQL_PORT
    },
};
module.exports = config;