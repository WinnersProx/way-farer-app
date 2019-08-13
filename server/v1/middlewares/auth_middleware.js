import passport from 'passport';
import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';
import User from '../models/user';

const userSchema = Joi.object().keys({
  id : Joi.number().integer(),
  email : Joi.string().email({minDomainSegments : 2}).required(),
  first_name : Joi.string().min(6).max(20).required(),
  last_name  : Joi.string().min(6).max(20).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,24}$/).required(),
  is_admin: Joi.boolean(),
  address : Joi.string().min(6).max(20).required(),
  created_on : Joi.date()
});

export default  {
  validateUser : (req, res, next) =>{
    const validate = userSchema.validate(req.body);
    const { error } = validate;
    if(error){
      return userHelper.respond(res, 400, "error","", error);
    }
    next();
  },
  validateSignin : (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
      return userHelper.respond(res, 400, "error", "", 'All fields are required "(email and password)"');
    }
    else{
      let user = User.findbyField('email', 'users', email);
      if(!user){
        return userHelper.respond(res, 404, "error", "","user not found");
      }
      else{
        if(!userHelper.comparePasswords(password, user.password)){
          return userHelper.respond(res, 400, "error","", "your password is invalid");
        }
        req.user = user;
      }
    }
    next();
  },
  checkUserToken: (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      // user informations can be accessed on req object as req.user
      req.user = user;
      if (err) {
        console.log(err);
        return userHelper.respond(res, 520, "error", "", err.message);
      }
      // check whether the token is in headers
      if (!user) {
        return userHelper.respond(res, 401, "error", "", 'No provided token or invalid one provided');
      }
      next();
    })(req, res, next);
  },
  exists : (req, res, next) => {
    const user = db.users.find(user => user.email === req.body.email);
    if(user){
      return userHelper.respond(res, 400, "error", "", "Email already taken");
    }
    next();
  },
  isAdmin : (req,res,next) => {
    const { user } = req;
    if(!user.isAdmin){
      return userHelper.respond(res, 403, "error", "", "Only admins can perform this action");
    }
    next();
  }

}
