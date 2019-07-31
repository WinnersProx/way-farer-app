import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
class UserModel extends Model{
    constructor(){
        super();
    }
    setAsAdmin(userId){
    	db.users[userId - 1].is_admin = true;
    	return this.findbyField('id','users',userId);
    }
}
export default new UserModel();
