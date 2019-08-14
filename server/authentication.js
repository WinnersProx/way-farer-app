import dotenv from 'dotenv';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import Userv1 from './v1/models/user';
import Userv2 from './v2/models/user';

dotenv.config();
let JwtStrategy = PassportJwt.Strategy;
let ExtractJwt = PassportJwt.ExtractJwt;
const { SECRET } = process.env;
console.log(SECRET);
passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  passReqToCallback : true
}, async (req, jwtPayload, done) => {
	let user;
	if(req.baseUrl.match('/api/v1'))
		user = Userv1.findbyField('email', 'users', jwtPayload.email);
	else
		user = await Userv2.findbyField('email', 'users', jwtPayload.email);
  if(user){
    return done(null, user);
  }
  else{
    return done(null, false);
  }
}));

export default passport;
