module.exports = {
    app: {
        domain: "http://localhost",
        port: process.env.port
        // port: 8090
    },
    db: {
        database: "web_framework",
        username: process.env.db_username,
        password: process.env.db_password,
        host: process.env.db_host,
        port: "3306",
        protocol: "mysql",
        force: false,
        logging: true
    },
    file: {
        path: "static"
    }

};