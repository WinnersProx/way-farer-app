import User from '../models/user';
import userHelper from '../helpers/user_helper';

const authController = {
  signup : async (req, res) => {
    // for hashing the password
    req.body.password = userHelper.hashPassword(req.body.password);
    let user = await User.createUser(req.body, 'users');
    const {id, email, first_name, last_name, is_admin} = user;
    const token = is_admin
      ? userHelper.authenticateUser({id,email,first_name, is_admin}) 
      : userHelper.authenticateUser({id,email,first_name});

    userHelper.respond(res, 201, "success", "account created successfully", {token});
  },
  signin : (req,res) => {
    const { id, email, first_name, last_name, isAdmin } = req.user;
    const token = isAdmin 
      ? userHelper.authenticateUser({id,email,first_name, isAdmin})
      : userHelper.authenticateUser({id,email,first_name});
        
    userHelper.respond(res, 200, "success", "signed in successfully", {token});
  }

    
}

export default authController
