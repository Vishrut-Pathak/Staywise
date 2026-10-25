// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const {default: mongoose} = require('mongoose');
const authRouter = require('./routes/authRouter');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use((req, res, next)=>{
  console.log('cookie check middleware', req.get('Cookie'));
  req.isLoggedIn = req.get('Cookie')?req.get('Cookie').split('=')[1]==='true': false;
  next();
});
app.use(authRouter);
app.use(storeRouter);

app.use("/host", (req, res, next)=>{
  if(req.isLoggedIn){
    next();
  }else{
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3001;
const DB_PATH = "mongodb://vishrutpathak1405_db_user:Pathak.14@ac-kpt8olg-shard-00-00.moggqwy.mongodb.net:27017,ac-kpt8olg-shard-00-01.moggqwy.mongodb.net:27017,ac-kpt8olg-shard-00-02.moggqwy.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-qma7qa-shard-0&authSource=admin"
mongoose.connect(DB_PATH).then(()=> {
  console.log('Connected to mongoose');
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
}).catch(err => {
  console.log("Error hwhile connecting to mongoose", err);
});