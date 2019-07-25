import userHelper from '../helpers/user_helper';
global.db = {
    users : [{}],
    trips : [{}],
    bookings : [{}]
}

class Model{
    constructor(){
    }
    create(datas, model){
        datas.id = db[model].length;
        datas.created_on = new Date();
        // for hashing the password 
        if(datas.password && model == 'users'){
            datas.password = userHelper.hashPassword(datas.password);
            datas.is_admin = false
        }
            
        db[model] = [...db[model], datas];
        return db[model][db[model].length - 1]; // the index => id - 1
    }
    findbyField(field, model, fieldValue){
		return db[model].find(found => {
			return found[field] === fieldValue
		})
	}
}
export default Model;