// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../db/db');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connection re-synced');
  })
  .catch((err) => {
    console.log('Error on re-synced', err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require('../models/user/user')(db.sequelize, DataTypes, db.Sequelize);
db.otp = require('../models/otp/otp')(db.sequelize, DataTypes, db.Sequelize);

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.Hotel = require('../models/hotel/hotel')(db.sequelize, DataTypes);
db.success = require('../models/sslcommerz/sslcommerz')(
  db.sequelize,
  DataTypes,
);
db.fail = require('../models/sslcommerzfail/sslcommerzfail')(
  db.sequelize,
  DataTypes,
);
db.refundtbl = require('../models/sslcommerzrefund/sslcommerzrefund')(
  db.sequelize,
  DataTypes,
);

db.recharge = require('../models/recharge/recharge')(db.sequelize, DataTypes);
db.lost_history = require('../models/lost_history/lost_history')(
  db.sequelize,
  DataTypes,
);

db.cardtbl = require('../models/cardtbl/cardtbl')(db.sequelize, DataTypes);
db.usagetbl = require('../models/usagetbl/usagetbl')(db.sequelize, DataTypes);
db.accountcardtbl = require('../models/accountcardtbl/accountcardtbl')(db.sequelize, DataTypes);
db.accountobutbl = require('../models/accountobutbl/accountobutbl')(db.sequelize, DataTypes);
// relations between schema
db.cardtbl.hasMany(db.recharge);
db.recharge.belongsTo(db.cardtbl);

// relation between sslcommerz success table and recharge table
// connecting with sslcommerez
db.success.hasOne(db.recharge);
db.recharge.belongsTo(db.success);
// relation between sslcommerz success table and recharge table
// connecting with sslcommerez
db.fail.hasOne(db.recharge);
db.recharge.belongsTo(db.fail);

//user table with card tbl
db.cardtbl.hasOne(db.lost_history);
db.lost_history.belongsTo(db.cardtbl);

db.user.hasMany(db.cardtbl);
db.cardtbl.belongsTo(db.user);

db.user.hasMany(db.lost_history);
db.lost_history.belongsTo(db.user);

db.cardtbl.hasMany(db.usagetbl);
db.usagetbl.belongsTo(db.cardtbl);

//acountcardtbl with user tbl
db.user.hasOne(db.accountcardtbl);
db.accountcardtbl.belongsTo(db.user);

//accountobutbl with user tbl
db.user.hasOne(db.accountobutbl);
db.accountobutbl.belongsTo(db.user);
//
// export

module.exports = db;
