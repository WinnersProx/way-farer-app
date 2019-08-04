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
  	filterBy(target, targetValue){
  		// filter based on either origin or destination
  		return db.trips.filter(trip => trip[target] === targetValue);
  	}
}
export default new TripsModel();
