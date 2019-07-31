import User from '../models/user';
import userHelper from '../helpers/user_helper';
const authController = {
    signup : (req, res) => {
        // for hashing the password 
        req.body.password = userHelper.hashPassword(req.body.password);
        req.body.is_admin = false;
        let user = User.create(req.body, 'users');
        user = user.id === 1 ? User.setAsAdmin(user.id) : user;
        const {id, email, first_name, last_name} = user;
        const token = userHelper.authenticateUser({id,email,first_name});
        return res.status(201)
        .send({
            status : 201,
            data : {
                email,
                first_name,
                last_name,
                token
            }
        })
    },
    signin : (req,res) => {
        const { id, email, first_name, last_name } = req.user;
        const token = userHelper.authenticateUser({id,email,first_name});
        return res.status(200)
        .send({
            status : 'success',
            data : { email, first_name, last_name, token }
        })
    }

    
}
export default authController