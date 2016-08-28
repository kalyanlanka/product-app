const AuthenticationController = require('./controllers/authentication'),
      ProductController = require('./controllers/product'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      config = require('./config/main'),
      apiRoutes = express.Router(),
      authRoutes = express.Router(),
      productRoutes = express.Router();


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

    apiRoutes.use('/products',productRoutes);

    productRoutes.use(function(req,res,next){

      var token = req.get('Authorization');

      if (token){
        token = token.trim().substring(7);

        jwt.verify(token,config.secret,function(err,decoded){
          if (err){
            console.log(err);
            return res.json({success: false, message: 'Failed to Authenticate the token'});
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.status(403).send({
          success: false,
          message: 'No Token Provided'
        });
      }
    });


    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    productRoutes.post('/insert',ProductController.insert);

    productRoutes.post('/query',ProductController.query);

    // Set url for API group routes
    app.use('/api', apiRoutes);
    app.get('/',function(req,res){
      res.send('Hello this is express');
    });
};
