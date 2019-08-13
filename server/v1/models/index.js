global.db = {
  users : [],
  trips : [],
  bookings : []
}

class Model{
  constructor(){
  }
  create(datas, model){
    datas.id = (db[model].length + 1);
    datas.created_on = new Date();   
    db[model] = [...db[model], datas];
    return db[model][db[model].length - 1]; // the index => id - 1
  }
  findbyField(field, model, fieldValue){
    return db[model].find(found => {
      return found[field] === fieldValue
    })
  }
  findAll(model){
    return db[model];
  }
}
export default Model;