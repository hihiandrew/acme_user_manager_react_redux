const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/acme_user_manager',
  { logging: false }
);

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(User, { as: 'manager' });
User.hasMany(User, { as: 'manages', foreignKey: 'managerId' });

const seed = async () => {
  const userSeed = ['moe', 'larry', 'curly'];
  // const [moe, larry, curly] = await Promise.all(
  //   userSeed.map(name => {
  //     User.create({ name });
  //   })
  // );
  // moe.setManger(curly);

  return Promise.all(
    userSeed.map(name => {
      return User.create({ name });
    })
  ).then(([moe, larry, curly]) => {
    moe.setManager(larry);
    curly.setManager(curly);
    console.log(`users seeded`);
  });
};

module.exports = { db, seed };
