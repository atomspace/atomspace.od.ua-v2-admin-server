const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const fileUpload = require('express-fileupload');

const { Mentor, Merch } = require('./models');
const config = require('./config');
const merchRouter = require('./routes/merch');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/api/v1', merchRouter);

// let mentor = {
//   id: 43,
//   name: 'Misha',
//   phone: '1234567890',
//   email: 'misha@gmail.com',
//   information: 'qwerty',
//   created_time: '2020-02-08T20:20:50.670Z',
//   updated_time: '2020-02-08T20:20:50.670Z'
// };
// let aaa = Mentor.getAll().then(res => console.log(res));

app.get('/', (req, res) => {
  res.send('Hello world!');
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
