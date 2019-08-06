import User from '../models/user';
import userHelper from '../helpers/user_helper';

const authController = {
    signup : (req, res) => {
        // for hashing the password 
        req.body.password = userHelper.hashPassword(req.body.password);
        req.body.isAdmin = false;
        let user = User.create(req.body, 'users');
        user = user.id === 1 ? User.setAsAdmin(user.id) : user;
        const {id, email, first_name, last_name, isAdmin} = user;
        const token = isAdmin 
        ? userHelper.authenticateUser({id,email,first_name, isAdmin}) 
        : userHelper.authenticateUser({id,email,first_name});

        userHelper.respond(res, 201, "success", {token});
    },
    signin : (req,res) => {
        const { id, email, first_name, last_name, isAdmin } = req.user;
        const token = isAdmin 
        ? userHelper.authenticateUser({id,email,first_name, isAdmin})
        : userHelper.authenticateUser({id,email,first_name});
        
        userHelper.respond(res, 200, "success", {token});
    }

    
}
export default authController