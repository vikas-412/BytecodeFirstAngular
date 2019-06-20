var express = require('express');
var router = express.Router();
const signupControl = require('../controllers/signupcontrol')
var loginControl = require('../controllers/logincontrol');
const addInfoControl = require('../controllers/addinfocontrol');
var authenticator = require('../controllers/authenticator');
const displayallInfoControl=require('../controllers/displayallinfocontrol');
const deleteInfoControl = require('../controllers/deleteinfo');
const getsingleInfoControl = require('../controllers/getsingleinfocontrol');
const editInfoControl =require('../controllers/editinfocontrol')
const myInfoControl = require('../controllers/myinfocontrol')
const editRoleControl =require('../controllers/editrolecontrol');
const { imageControl, singleFileUpload } = require('../controllers/imageControl');
var multer = require('multer');



router.post('/', (req, res, next)=> {
  console.log(req.body);
  res.send({
    message :'Data transfer success 1',
    success : true
  });
});
router.post('/signup', signupControl);
router.post('/login', loginControl);
router.use(authenticator);
router.post('/addinfo', addInfoControl);
router.post('/allinfo',displayallInfoControl );
router.post('/deleteinfo', deleteInfoControl);
router.post('/getsingleinfo', getsingleInfoControl);
router.post('/editinfo',editInfoControl);
router.post('/myinfo', myInfoControl)
router.post('/editrole', editRoleControl);
router.post('/images', singleFileUpload(), imageControl );

module.exports = router;
