const mongoose = require('mongoose')

const UserSchema= mongoose.Schema({
    email:{type: String, require: true},
    password:{type: String, require: true},
    fullName:{type: String, require: true},
    userType:{type: String, require: true},
    phone:{type: Number, require: true},
    dateOfBirth:{type: Date, require: true},
    registerDate:{type: Date, default: new Date().getTime()},
    numberOfTrips:{type: Number},
    numberOfKms:{type: Number},
    avatar:{type: String},
    isActive:{type: Boolean, default: true},
})

const User = mongoose.model('User',UserSchema);

module.export={
    UserSchema, User
}