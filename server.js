const express = require('express');
const dbRouter = require('./data/db-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', dbRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda DB API</h>
    <p>Welcome to the DB API</p>
  `);
});

module.exports = server;