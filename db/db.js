// connect to database
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    // host: '192.168.0.11',
    // host: '192.168.0.115',
    host: 'sql6.freesqldatabase.com',
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 },
    logging: false,
    // dialectOptions: {
    //   useUTC: false, //for reading from database
    //   dateStrings: true,
    //   typeCast: function (field, next) { // for reading from database
    //     if (field.type === 'DATETIME') {
    //       return field.string()
    //     }
    //     return next()
    //   },
    // },
    timezone: '+06:00',
    port: 3306,
    //    host: "localhost",
    //   dialect: "mysql",
    //   pool: { max: 5, min: 0, idle: 10000 },
    //   logging: false,
    //   timezone: "+06:00",
  },
);

sequelize
  .authenticate()
  .then(() => {
    ('Database connected successfully');
  })
  .catch((error) => {
    ('Error:', error.message);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
