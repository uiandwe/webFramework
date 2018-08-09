module.exports = {
    app: {
        domain: "http://localhost",
        port: process.env.port
        // port: 8090
    },
    db: {
        database: "web_framework",
        username: "root",
        password: process.env.db_password,
        host: "localhost",
        port: "3306",
        protocol: "mysql",
        force: false,
        logging: true
    },
    file: {
        path: "static"
    }

};