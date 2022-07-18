const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = process.env.DATABASE_URL ? new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
}) : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.form = require('./form.model.js')(sequelize, Sequelize);
db.field_form = require("./field-form.model.js")(sequelize, Sequelize);
db.type_field = require('./type-field.model.js')(sequelize, Sequelize);

module.exports = db;
