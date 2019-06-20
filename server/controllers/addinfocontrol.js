var mongoose = require('mongoose');

const Info = require('../models/info');

const addInfoControl = (req, res) => {
    console.log(req.body);
    Info.findOne({ emailID: req.body.emailID }, (err, data1) => {
        if (err) {
            console.log('Database error');
            return res.send({
                message: "Database error."
            })
        }
        console.log(data1);
        if (!data1){
    Info.create(req.body, (err, data) => {
        if (err) {
            console.error(err);
            return res.json('Database error, information not saved.')
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
    })}
    else{
        console.log('Data already present');
        return res.send({
            message : 'Information for this email ID has already been added.'
        })
    }
})
}

module.exports = addInfoControl;
