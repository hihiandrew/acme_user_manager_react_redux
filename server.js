const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { db, seed } = require('./db');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.send('hi');
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
