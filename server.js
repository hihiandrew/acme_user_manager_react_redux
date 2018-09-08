const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { db, seed, User } = require('./db');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/api/users', (req, res, next) => {
  const users = User.findAll().then(users => {
    res.json(users);
  });
});

db.sync({ force: true })
  .then(() => {
    seed();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`
    Listening on port: ${PORT}..
    http://localhost:${PORT}/

    `);
    });
  });
