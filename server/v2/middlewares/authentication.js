import dotenv from 'dotenv';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import User from '../models/user';
import config from '../config/config';
dotenv.config();
let JwtStrategy = PassportJwt.Strategy;
let ExtractJwt = PassportJwt.ExtractJwt;
const { SECRET } = process.env;
passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
}, async (jwtPayload, done) => {
  const user = await User.findbyField('id', 'users', jwtPayload.id);
  if(user){
    return done(null, user);
  }
  else{
    return done(null, false);
  }
}));

export default passport;
