var mongoose = require('mongoose');

var Users = require('../models/users');
var Info = require('../models/info');

const myInfoControl = (req, res) => {
    console.log(req.body);
    Users.findOne({ _id: req.body.createdBy })
        .populate('profilesAdded', '-updateDate')
        .exec((err, user) => {
            return res.send({ 
                success: true,
                data : user
            })
        })
}


module.exports = myInfoControl;
