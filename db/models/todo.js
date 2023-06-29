const {DataTypes} = require('sequelize')

module.exports = (db, defOptions, modelName) => {
    const model = db.define(
        modelName,
        {
            description: DataTypes.TEXT,
            isDone: {type: DataTypes.BOOLEAN, defaultValue: false}
        },
        defOptions
    )
    
    model.associate = (models) => {
        console.log(models)
        model.belongsTo(models.todoUser, {
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
        });
      };

    return model
}

