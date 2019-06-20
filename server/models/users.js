var mongoose = require('mongoose');
var Info = require('./info');

const userSchema= mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Enter the field']
    },
    emailID : {
        type : String,
        required : true,
        unique:[true,"Account by this email ID is already present"]
    },
    password : {
        type : String,
        required : true
    },
    profilesAdded: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'info'
    }]
});

var Users = mongoose.model('users',userSchema);

module.exports= Users;

