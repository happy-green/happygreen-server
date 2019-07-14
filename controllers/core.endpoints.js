const auth = require('./auth');

module.exports = (app)=>{
  app.use('/auth/',auth);
  app.get('/',(req,res)=>{
    res.send("Working");
  })
}