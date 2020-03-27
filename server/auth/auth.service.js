'use strict';

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const User = require('../components/datastore/user.model');

// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

const SESSION_SECRET = "5#o27NK&IsbIf5ou9RBn)RD#a73SBlG%nSxR#aR45Shb2OpuprZ7CRLm*jBOlSX)9#@Ja9!%EUoP^Yb3mVtm1(fQ!MM#myHksHDkKWN8NwUEV60gFSSacQd8tBBgj2ux";
const ROLES = ['monitor', 'config', 'admin'];
const SESSION_VALIDITY = 10800;


const validateJwt = expressJwt({ secret: SESSION_SECRET });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if(req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
        User.findById(req.user._id, function (err, user) {
          if (err) return next(err);
          if (!user) return res.status(401).send('Unauthorized');

          req.user = user;
          next();
        });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (ROLES.indexOf(req.user.role) >= ROLES.indexOf(roleRequired)) {
        next();
      }
      else {
        res.status(403).json({err: 'Forbidden. You do not have required permissions', response: null});
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, SESSION_SECRET, { expiresIn: SESSION_VALIDITY }); // three hours
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
