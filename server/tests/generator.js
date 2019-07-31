import bcrypt from 'bcrypt';
import User from '../models/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
import userHelper from '../helpers/user_helper';
chai.use(chaiHttp);
const generator = {
    users : [
        {
            email : "bihames4vainqueur@gmail.com",
            first_name:"Bihame",
            last_name:"Vainqueur",
            password: userHelper.hashPassword('usertest'),
            address:"Goma",
            is_admin : false
        },
        {
            email : "georgeTest@gmail.com",
            first_name:"George",
            last_name:"Test",
            password: userHelper.hashPassword('usertest'),
            address:"Goma",
            is_admin : false
        }
    ],
    generateUsers : () => {
        generator.users.forEach(user => {
            //user.password = userHelper.hashPassword('usertest');
            let newUser = User.create(user, 'users');
            newUser = newUser.id === 1 ? User.setAsAdmin(newUser.id) : newUser;
        });
    }
}
export default generator;