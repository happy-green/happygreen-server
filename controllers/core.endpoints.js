const authRoutes = require('./endpoints.auth');
const userRoutes = require('./endpoints.user');

module.exports = (app)=>{
  app.use('/auth/',authRoutes);
  app.use('/user/',userRoutes)
}