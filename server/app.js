const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const router = require('./passport')
const morgan = require('morgan')
const session = require('express-session')
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/passport-google-login', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('MongoDB database connection established successfully');
// });

app.use(passport.initialize())
// const SQLiteStore = require('connect-sqlite3')(session);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
  origin: '*',
}))
app.use(morgan('dev'))

app.use('/api', router)

const server = require('http').createServer(app)

const { PORT } = require('./config')
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})
