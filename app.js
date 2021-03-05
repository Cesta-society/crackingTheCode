const mongoose = require("mongoose");
const express= require("express");
const app = express();
const path= require('path');
const bodyParser = require("body-parser");
const config= require('config');
const cors= require('cors');
const indexRouter = require('./routes/index');
const questions = require('./routes/questions');
const users = require('./routes/users');

mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=> console.log(`Connected to ${config.get('db')}...`))
  .catch(err => console.log(`Could not connect to ${config.get('db')}...`,err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use('/quiz', questions);
app.use('/user', users);

require('./prod.js')(app);

app.set("view engine", "pug");

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './Client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname ,'.','Client','build','index.html'));
  }); 
}
else{
  app.use(express.static(path.join(__dirname, './Client/public')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'./Client/public/index.html'));
  });
}


const port=process.env.PORT || 8080;
console.log(port);
const server=app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);

module.exports= server;