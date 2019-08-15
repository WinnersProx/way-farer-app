import User from '../models/user';
import userHelper from '../helpers/user_helper';

const authController = {
  signup : async (req, res) => {
    // for hashing the password
    req.body.password = userHelper.hashPassword(req.body.password);
    let user = await User.createUser(req.body, 'users');
    const { email } = user;
    const token = userHelper.authenticateUser({email});

    userHelper.respond(res, 201, "success", "account created successfully", {token});
  },
  signin : (req,res) => {
    const { email } = req.user;
    const token = userHelper.authenticateUser({email});
        
    userHelper.respond(res, 200, "success", "signed in successfully", {token});
  }

    
}

export default authController
