var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {type: String, unique: true, required: true},
    firstName : String,
    lastName : String,
    secret : String,
    userRole : String,
    password : {type: String, required: true},
    email: {type: String, required: true},
  });
  
  UserSchema.pre("save", function(next){
    // this.password = "hash_me_and_add_some_salt "+ this.password;
    this.lastUpdated = new Date();
    next();
  });
  
  UserSchema.pre("update",function(next){
   this.update({},{$set : {lastUpdated: new Date()}});
   next();
  });

module.exports = mongoose.model("User", UserSchema);
