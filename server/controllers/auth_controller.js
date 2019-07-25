import User from '../models/user';
import userHelper from '../helpers/user_helper';
const authController = {
    signup : (req, res) => {
        let user = User.create(req.body, 'users');
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
    test : (req,res) => {
        res.status(200)
        .send({
            user : req.user
        })
    }

    
}
export default authController