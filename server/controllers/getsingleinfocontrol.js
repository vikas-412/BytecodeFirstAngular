var mongoose = require('mongoose');

const getImageData = require('./geiImagedata');
const Info = require('../models/info');

const getsingleInfoControl = (req, res) => {
    console.log(req.body);
    Info.findOne({_id:req.body.id}, (err, data) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Database error'
            })
        } else {
            let imgPath = data.imgLocation;
            console.log(data,'Image path')
            if (imgPath){
            let imgData = imgPath;
            let dataFinal = {...data, imgData: imgData}
            return res.send({
                success: true,
                info: dataFinal
            })} else {
                return res.send({
                    success : true,
                    info : data
                })
            }
        }
    })

}

module.exports = getsingleInfoControl;