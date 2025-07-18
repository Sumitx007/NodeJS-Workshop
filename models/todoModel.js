const todoTable = (sequelize, DataTypes) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }, 
        status: {
            type: DataTypes.ENUM("completed", "Pending"),
            defaultValue: "pending"
        }
    })
    return Todo
}

module.exports = todoTable
//haha