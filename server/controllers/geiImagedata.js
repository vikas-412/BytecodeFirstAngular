var mongoose = require('mongoose');
const Info =require('../models/info')
var fs = require('fs');
let data

const getImageData = (filepath)=>{
    data = fs.readFileSync(filepath);
    return data
}

module.exports = getImageData;