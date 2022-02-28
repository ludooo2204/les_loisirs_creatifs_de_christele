let express = require("express");
let router = express.Router();
const path = require('path')
console.log("__dirname")
console.log("__dirname")
console.log("__dirname")
console.log("__dirname")
console.log(__dirname)
// const controller = require("../controllers/like.controller");
const Sequelize = require('sequelize')
const Op= Sequelize.Op
const db = require("../models");
const ResetToken = db.ResetTokens;


// router.post("/", controller.postLike);
router.get('/', async function(req, res, next) {
    /**
     * This code clears all expired tokens. You
     * should move this to a cronjob if you have a
     * big site. We just include this in here as a
     * demonstration.
     **/
    await ResetToken.destroy({
      where: {
        expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
      }
    });
   
    //find the token
    var record = await ResetToken.findOne({
      where: {
        email: req.query.email,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: req.query.token,
        used: 0
      }
    });
   
    if (record == null) {
      return res.send('Token has expired. Please try password reset again.')    
    }
   
    // res.json({record})
    res.render('resetPassword', {
      showForm: true,
      record: record
    });
  });








  router.post('/reset-password', async function(req, res, next) {
    //compare passwords
    if (req.body.password1 !== req.body.password2) {
      return res.json({status: 'error', message: 'Passwords do not match. Please try again.'});
    }
   
    /**
    * Ensure password is valid (isValidPassword
    * function checks if password is >= 8 chars, alphanumeric,
    * has special chars, etc)
    **/
    if (!isValidPassword(req.body.password1)) {
      return res.json({status: 'error', message: 'Password does not meet minimum requirements. Please try again.'});
    }
   
    var record = await ResetToken.findOne({
      where: {
        email: req.body.email,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: req.body.token,
        used: 0
      }
    });
   
    if (record == null) {
      return res.json({status: 'error', message: 'Token not found. Please try the reset password process again.'});
    }
   
    var upd = await ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.body.email
        }
    });
   
    var newSalt = crypto.randomBytes(64).toString('hex');
    var newPassword = crypto.pbkdf2Sync(req.body.password1, newSalt, 10000, 64, 'sha512').toString('base64');
   
    await User.update({
      password: newPassword,
      salt: newSalt
    },
    {
      where: {
        email: req.body.email
      }
    });
   
    return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
  });

   
  
  




module.exports = router;
