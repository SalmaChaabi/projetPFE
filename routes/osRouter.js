var express = require('express');
var router = express.Router();
const osController = require('../controller/osController')


router.get('/getInformation',osController.getOsInfomation);

router.get("/Cpus",osController.osCpus);

router.get("/osCpus/:id",osController.osCpusById);



module.exports = router;
