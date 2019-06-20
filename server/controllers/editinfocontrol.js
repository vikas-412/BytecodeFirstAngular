var mongoose = require('mongoose');

const Info = require('../models/info');

const editInfoControl = (req, res) => {
    console.log(req.body);
    Info.findOne({ emailID: req.body.emailID }, (err, data1) => {
        if (err) {
            console.log('Database error');
            return res.send({
                message: "Database error.",
                success: false                
            })
        }
        console.log(data1);
        if (!data1){
            Info.create(req.body, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.send({
                        message: "Database error. Information not saved",
                        success: false
                    })
                };
                if (data) {
                    return res.send({
                        message: 'Infomation saved.',
                        success: true
                    })
                } else {
                    console.log('Field(s) missing, information not saved.');
                    return res.end({
                        message: 'Field(s) missing, information not saved.',
                        success: false
                    })
                }
            })
        }
        else{                      
            if (data1.createdBy.equals(req.body.createdBy)) {
            Info.update({emailID:req.body.emailID},req.body, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.send({
                        message :'Database error, information not updated.',
                        success :false
                    })
                };
                if (data) {
                    return res.send({
                        message: 'Infomation updated.',
                        success: true
                    })
                } else {
                    console.log('Field(s) missing, information not updated.');
                    return res.end({
                        message: 'Field(s) missing, information not updated.',
                        success: false
                    })
                }
            })
        }
        else {
            console.log('This cannot be changed as it is created by other user.');
            return res.send({
                success :false,
                message: 'You do not have access to change this data.'
            })
        }}
    })
}

module.exports = editInfoControl;
