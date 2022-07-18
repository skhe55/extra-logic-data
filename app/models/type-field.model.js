module.exports = (sequelize, Sequelize) => {
    const TypeField = sequelize.define("type_fields", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          type_field: {
            type: Sequelize.STRING
          },
    });
  
    return TypeField;
  };