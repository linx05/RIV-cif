const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { decode } = require('./api/cypher');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/descifrar', decode);

app.listen(3000, () => console.log('Example app listening on port 3000!'));