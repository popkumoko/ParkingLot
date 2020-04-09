const express = require('express');
const parkingController = require('../controllers/parking')

const router = express.Router();

router.post('/createParkingLot', parkingController.createParkingLot);
router.post('/parkCar', parkingController.createParkCar);
router.post('/leaveSlot', parkingController.leaveParkCar);
router.get('/getFreeSlot', parkingController.getFreeSlot);
router.get('/getAllNumberPlate', parkingController.getAllNumberPlate);


module.exports = router;