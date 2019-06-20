var multer = require('multer');

var imageName;
// var imgInName;

var photoStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, process.cwd() + "/public/images");
    },
    filename: function (req, file, callback) {
        // imgInName = file.originalname
        imageName = Date.now() + "-" + file.originalname
        callback(null, Date.now() + "-" + file.originalname);
    }
});

let singleFileUpload = () => {
    return multer({
        storage: photoStorage
    }).single('lalu');//We cannot use imgName variable in here
    //also, the image sent must have a string pattern of--> "lalu" in its name
}



function imageControl(req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        //filepath to be saved to database;
        // const host = req.hostname;
        // const filePath = req.protocol + "://" + host + '/' + req.file.path;
        // const filePath = req.file.path;        
        // console.log('filepath of saved file', filePath, "q1212", req.file.path.replace());
        console.log('file received');
        return res.send({
            success: true,
            imgName: imageName
        })
    }
}

module.exports = {
    imageControl,
    singleFileUpload
}