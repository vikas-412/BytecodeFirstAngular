var Users = require ('./users');

var mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the field']
    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    emailID : {
        type : String,
        required : true,
        unique : true
    },
    hobbies : {
        music : {
            type : Boolean
        },
        books: {
            type: Boolean
        },
        sports: {
            type: Boolean
        },
        cycling: {
            type: Boolean
        }
    },
    gender: {
        type: String,
        required: true
        // unique : [true,"Enter a different username"]
    },
    jobPost: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    phoneNo : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    createDate : {
        type : Date,
        required : true
    },
    updateDate : {
        type : Date
    },
    roles : {
        type : [String]
    },
    imgName : {
        type :String,
        required : [true,"No image sent"]
    }
});

var Info = mongoose.model('info', infoSchema);

module.exports = Info;

