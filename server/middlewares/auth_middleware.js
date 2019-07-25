import passport from 'passport';
import Joi from '@hapi/joi';
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
            return res.status(400).send({
                error,
                status : "error"
            });
        }
        next();
    },
    checkUserToken: (req, res, next) => {
        passport.authenticate('jwt', (err, user, info) => {
          // user informations can be accessed on req object as req.user
          req.user = user;
          if (err) {
            return res.status(520).send({ error: error.message });
          }
          // check whether the token is in headers
          if (!user) {
            return res.status(401).send({
              status : 'error',
              error: 'No provided token or invalid one provided'
            });
          }
          return next();
        })(req, res, next);
    }
}
