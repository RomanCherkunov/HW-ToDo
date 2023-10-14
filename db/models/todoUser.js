const {DataTypes} = require('sequelize')

module.exports = (db, defOptions, modelName) => {
    const model = db.define(
        modelName,
        {
            name: DataTypes.TEXT,
            login: DataTypes.TEXT,
            password: DataTypes.TEXT,
            
        },
        defOptions
    )

    model.associate = (models) => {
        model.hasMany(models.todo, {
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
        });
      };

    return model
}

