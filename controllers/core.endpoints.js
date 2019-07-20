const authRoutes = require('./endpoints.auth');
const userRoutes = require('./endpoints.user');
const uploadRoutes = require('./endpoints.uploads');

module.exports = (app)=>{
  app.use('/auth/',authRoutes);
  app.use('/user/',userRoutes);
  app.use('/upload/',uploadRoutes);
}