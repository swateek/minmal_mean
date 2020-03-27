'use strict';

var User = require('../../components/datastore/user.model');

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

function _prepResponse(result, err, res){
   var data = {};

   if(err) {
     data["error"] = err;
     data["response"] = null;
     return res.status(500).json(data);
   }else{
     data["error"] = null;
     data["response"] = result;
     return res.status(200).json(data);
   }
 }

 function _handleError(msg, code){
   var err = {};
   err.errorMessage = msg;
   err.code = code;

   return err;
 }
