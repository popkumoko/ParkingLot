'use strict'
const httpStatus = require('http-status');
const { parkingLotService, parkCarService } = require('../../../services');

const createParkingLot = async (req, res) => {
  // {
  //   parkingSmall: {
  //     pricePerHour: 20,
  //     slotStart: 1,
  //     slotEnd: 30,
  //   },
  //   parkingMedium: {
  //     pricePerHour: 30,
  //     slotStart: 31,
  //     slotEnd: 60,
  //   },
  //   parkingLarge: {
  //     pricePerHour: 40,
  //     slotStart: 61,
  //     slotEnd: 100,
  //   }
  // }
  const payload = { ...req.body };

  const duplicateSlot = await parkingLotService.createParkingLot(payload);
  if(duplicateSlot.length != 0) {
    res.status(httpStatus.OK).send('have duplicate slot ' + duplicateSlot.toString());
  } else {
    res.status(httpStatus.OK).send();
  }
};

const createParkCar = async (req, res) => {
  const payload = { ...req.body };
  const result = await parkCarService.getFreeSlot(payload.numberPlate, payload.type);
  res.status(httpStatus.OK).send(result);
};

const leaveParkCar = async (req, res) => {
  const payload = { ...req.body };
  const result = await parkCarService.leaveParkCar(payload.slotCode);
  res.status(httpStatus.OK).send(result.toString());
};

const getFreeSlot = async (req, res) => {
  const result = await parkingLotService.getFreeSlot();
  res.status(httpStatus.OK).send(result);
};

const getAllNumberPlate = async (req, res) => {
  const { carSize }  = { ...req.query };
  const result = await parkCarService.getAllNumberPlateByCarSize(carSize);
  res.status(httpStatus.OK).send(result);
}

module.exports = {
  createParkingLot,
  createParkCar,
  leaveParkCar,
  getFreeSlot,
  getAllNumberPlate
};
