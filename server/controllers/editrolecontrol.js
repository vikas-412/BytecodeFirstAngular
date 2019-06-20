var mongoose = require('mongoose');

const Info = require('../models/info');

const editRoleControl = (req, res) => {
    console.log(req.body);
    Info.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, data) => {
        if (err) {
            return res.send({
                success: false,
                message: "Database error"
            })
        }
        if (!data) {
            return res.send({
                success: false,
                message: "Data you are editing is not present"
            })
        } else {
            Info.find({}, (err, data1) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Database error'
                    })
                } else {
                    return res.send({
                        success: true,
                        message: 'Roles changed.',
                        infodata: data1
                    })
                }
            })
            console.log(data);
            // return res.send({
            //     message: 'Roles changed.',
            //     success: true,
            //     afterupdate : data
            // })
        }
    })
    // Info.findOne({_id : req.body.id},(err,info)=>{
    //     if (err){
    //         return res.send({
    //             success: false,
    //             message: "Database error"
    //         })
    //     }
    //     if (!info){
    //         return res.send({
    //             success:false,
    //             message : "Data you are editing is not present"
    //         })
    //     } else {
    //         if (info.createdBy.equals(req.body.createdBy)) {
    //             Info.update({ _id: req.body.id }, req.body, (err, data) => {
    //                 if (err) {
    //                     console.error(err);
    //                     return res.send({
    //                         message: 'Database error, roles not added.',
    //                         success: false
    //                     })
    //                 };
    //                 if (data) {
    //                     console.log(data);
    //                     return res.send({
    //                         message: 'Roles changed.',
    //                         success: true
    //                     })
    //                 } else {
    //                     console.log('Information not updated.');
    //                     return res.end({
    //                         message: 'Information not updated.',
    //                         success: false
    //                     })
    //                 }
    //             })
    //         }
    //         else {
    //             console.log('This cannot be changed as it is created by the other user.');
    //             return res.send({
    //                 success: false,
    //                 message: 'You do not have access to change this data.'
    //             })
    //         }
    //     }
    // })
}

module.exports = editRoleControl