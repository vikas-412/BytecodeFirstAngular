var mongoose = require('mongoose');

const Info = require('../models/info');

const displayallInfoControl = (req,res)=>{
    console.log(req.body);
    Info.find({},(err,data)=>{
        if (err){
            return res.send({
                success : false,
                message : 'Database error'
            })
        } else {
            return res.send({
                success : true,
                infodata : data
            })
        }
    })

}

module.exports = displayallInfoControl;