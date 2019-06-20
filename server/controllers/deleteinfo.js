var mongoose = require('mongoose');

const Info = require('../models/info');

const deleteInfoControl=(req,res)=>{
    console.log(req.body);
    Info.findOneAndRemove({emailID : req.body.emailID},(err)=>{
        if (err){
            return res.send({
                message : "Database error",
                success : false
            })
        }else{
            return res.send({
                message : "Document deleted",
                success : true
            })
        }
    })

}


module.exports = deleteInfoControl;