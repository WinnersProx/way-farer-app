import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
class UserModel extends Model{
    constructor(){
        super();
    }
}
export default new UserModel();
