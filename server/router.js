const AuthenticationController = require('./controllers/authentication'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      apiRoutes = express.Router(),
      authRoutes = express.Router();

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

      // Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";


module.exports = function(app) {
    // Initializing route groups


    //=========================
    // Auth Routes
    //=========================

    // Set auth routes as subgroup/middleware to apiRoutes




    apiRoutes.use('/auth', authRoutes);


    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    //console.log(authRoutes);
    //console.log(apiRoutes);

    // Set url for API group routes
    app.use('/api', apiRoutes);
    app.get('/',function(req,res){
      res.send('Hello this is express');
    });
  
    console.log(app);
};
