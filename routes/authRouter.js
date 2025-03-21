var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');
const upload = require("../middlewares/uploadFile")


/* GET users listing. */
router.get('/getAllUsers',authController.getAllUsers );
router.get('/getUserById/:id',authController.getUserByID );
router.post('/addUserAdmin',authController.addUserAdmin );
router.post('/addUserTechnicienRadio',authController.addUserTechnicienRadio );
router.post('/addUserAgentComptable',authController.addUserAgentComptable );
router.post('/addUserFournisseurLsTélècom',authController.addUserFournisseurLsTélècom );
router.get('/searchUsersByName',authController.searchUsersByName );
router.put('/updateUser/:id',authController.updateuser);
router.delete('/deleteUser/:id',authController.deleteUser );
router.post('/login',authController.login); 
router.post('/logout',authController.logout); 







module.exports = router;