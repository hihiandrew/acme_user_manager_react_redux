const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { db, seed, User } = require('./db');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded());

app.get('/api/users', (req, res, next) => {
  User.findAll().then(users => {
    res.json(users);
  });
});

app.delete('/api/users/:id', (req, res, next) => {
  const id = req.params.id * 1;
  User.destroy({
    where: { id },
  }).then(() => {
    User.findAll().then(users => res.send(users));
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
