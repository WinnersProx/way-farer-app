import passport from 'passport';
import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';
import Trips from '../models/trips';
const tripsSchema = Joi.object().keys({
    id : Joi.number().integer(),
    seating_capacity : Joi.number().integer().min(1).required(),
    origin : Joi.string().min(6).max(20).required(),
    destination  : Joi.string().min(6).max(20).required(),
    trip_date : Joi.date().required(),
    fare : Joi.number().required(),
    bus_licence_number : Joi.string().min(6).max(20).required(),
    status : Joi.date() // active || cancelled
});

export default  {
    validateTrip : (req, res, next) =>{
        const validate = tripsSchema.validate(req.body);
        const { error } = validate;
        if(error){
            return res.status(400).send({
                error,
                status : "error"
            });
        }
        next();
    },
    isValidTrip : (req, res, next) => {
        const validate = Joi.number().integer().validate(req.params.trip_id);
        if(!validate.error){
            const trip = Trips.findbyField('id','trips', parseInt(req.params.trip_id));
            if(!trip){
                return res.status(404).send({
                    status : "error",
                    error : "Trip not found, (does not exist)"
                })
            }
        }
        else{
            return res.status(400).send({
                status : "error",
                error : validate.error
            })
        }
        next();
    }
}
