"use strict";

const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main');


function generateToken(user) {
    return jwt.sign(user, config.secret, {
      expiresIn: 10080 // in seconds
    });
}

function setUserInfo(request){
  return {
    _id: request.id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role,
  };
}


exports.login = function(req,res,next){
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}


exports.register = function(req,res,next){
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!email){
    return rest.status(422).send({error: 'You must enter email'});
  }
  if (!firstName){
    return rest.status(422).send({error: 'You must enter First Name'});
  }
  if (!lastName){
    return rest.status(422).send({error: 'You must enter Last Name'});
  }
  if (!password){
    return rest.status(422).send({error: 'You must enter password'});
  }


  User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
          email: email,
          password: password,
          profile: { firstName: firstName, lastName: lastName }
        });

        user.save(function(err, user) {
          if (err) { return next(err); }

          // Subscribe member to Mailchimp list
          // mailchimp.subscribeToNewsletter(user.email);

          // Respond with JWT if user was created

          let userInfo = setUserInfo(user);

          res.status(201).json({
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
          });
        });
    });
}

//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}
