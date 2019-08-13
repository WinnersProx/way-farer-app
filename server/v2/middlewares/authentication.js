import passport from 'passport';
import PassportJwt from 'passport-jwt';
import User from '../models/user';
import config from '../config/config';
var JwtStrategy = PassportJwt.Strategy;
let ExtractJwt = PassportJwt.ExtractJwt;

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secretKey
}, (jwtPayload, done) => {
  let user = User.findbyField('id', 'users', jwtPayload.id);
  if(user){
    return done(null, user);
  }
  else{
    return done(null, false);
  }
}));

export default passport;
