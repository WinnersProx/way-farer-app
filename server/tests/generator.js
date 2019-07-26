import bcrypt from 'bcrypt';
import User from '../models/user';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
chai.use(chaiHttp);
const generator = {
    users : {
        user1 : {
            email : "bihames4vainqueur@gmail.com",
            first_name:"Bihame",
            last_name:"Vainqueur",
            password:'winnerstest',
            address:"Goma"
        },
        user2 : {
            email : "georgeTest@gmail.com",
            first_name:"George",
            last_name:"Test",
            password:'georgestest',
            address:"Goma"
        }
    },
    generateUsers : () => {
        const user1 = chai.request(app)
        .post('/api/v1/auth/signup')
        .send(generator.users.user1);
        const user2 = chai.request(app)
        .post('/api/v1/auth/signup')
        .send(generator.users.user2);
        return { user1, user2 };
    }
}
export default generator;