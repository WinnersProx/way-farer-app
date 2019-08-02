import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
class TripsModel extends Model{
    constructor(){
        super();
  	}
  	cancel(tripId){
  		const target = db.trips[tripId - 1].status = 'cancelled';
  		return db.trips[tripId - 1];
  	}
}
export default new TripsModel();
