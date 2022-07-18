module.exports = (sequelize, Sequelize) => {
    const Form = sequelize.define("forms", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          form_uid: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          form_name: {
            type: Sequelize.STRING
          },
    });
  
    return Form;
  };