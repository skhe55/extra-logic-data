module.exports = (sequelize, Sequelize) => {
    const FormField = sequelize.define("form_fields", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name_field: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
          },
          value: {
            type: Sequelize.STRING
          },
          form_uid: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: "forms",
              key: "form_uid"
            }
          },
          type_field_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "type_fields",
              key: "id"
            }
          },
    });
  
    return FormField;
  };