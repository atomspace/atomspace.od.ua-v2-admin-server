const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const fileUpload = require('express-fileupload');
const path = require('path');

const { Mentor, Merch } = require('./models');
const config = require('./config');
const merchRouter = require('./routes/merch');
const newsRouter = require('./routes/news');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/api/v1', merchRouter);
app.use('/api/v1', newsRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/v1/image/:folder/:file', (req, res) => {
  const { folder, file } = req.params;
  try {
    res.sendFile(path.join(__dirname, 'uploads', folder, file));
  } catch {
    res.json({ found: false });
  }
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const accessToken = jwt.sign({ username, password }, config.JWT_SECRET_KEY);

  res.json({ success: true, accessToken });
});

app.listen(8000, () => {
  console.log('Listening 8000 port');
});
