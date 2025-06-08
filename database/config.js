const dotenv = require("dotenv")
const { Sequelize, DataTypes } = require("sequelize")
dotenv.config()

const sequelize = new Sequelize({
    host: process.env.db_host,
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_name,
    port: process.env.db_port,
    dialect: "mysql"
})


sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((err) => {
        console.error("Faile to connect", err.message)
    })

const db = {}
db.users = require("./../models/userModel")(sequelize,DataTypes)
db.todo = require("./../models/todoModel")(sequelize,DataTypes)


sequelize.sync({alter : true})
.then(() => {

    console.log("Table are created")
})
.catch((err) => {
    console.error("Error message: ", err.message)
})

module.exports = sequelize
module.exports = db