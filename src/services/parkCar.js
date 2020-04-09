'use strict';
const { ParkCarModel, ParkingLotModel, ParkingSlotModel } = require('../models');
const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment-timezone');

const getFreeSlot = async(numberPlate, type) => {
  const schema = Joi.object().keys({
    numberPlate: Joi.string(),
    type: Joi.string(),
  });

  ({ numberPlate, type } = Joi.attempt({
    numberPlate: numberPlate,
    type: type
  }, schema));

  const freeSlot = await ParkingSlotModel.find({ isFull: false, type: type }).limit(1).lean();
  if (!freeSlot) {
    return 'No slot';
  }

  await ParkCarModel.create({
    numberPlate: numberPlate,
    slotCode: freeSlot[0].slotCode,
    timeIn: new Date(),
    type: type,
  });

  await ParkingSlotModel.findOneAndUpdate({ _id: freeSlot[0]._id }, { $set: { isFull: true }});
  await ParkingLotModel.findOneAndUpdate({ type: type }, { $inc: { free: -1 }});

  return freeSlot[0].slotCode;
};

const leaveParkCar = async(slotCode) => {
  const schema = Joi.object().keys({
    slotCode: Joi.string(),
  });

  ({ slotCode } = Joi.attempt({
    slotCode: slotCode,
  }, schema));

  const carPark = await ParkCarModel.findOne({ slotCode: slotCode, timeOut: { $exists: false }}).lean();
  const parkingLot = await ParkingLotModel.findOne({ type: carPark.type }).lean();

  const timeOut = new Date();
  const diffTime = moment.duration(moment(timeOut).diff(carPark.timeIn));
  const total = Math.ceil(diffTime.asHours()) * parkingLot.pricePerHour;

  await ParkCarModel.findOneAndUpdate({ _id: carPark._id }, { $set: { timeOut: timeOut, total: total }});
  await ParkingSlotModel.findOneAndUpdate({ slotCode: slotCode }, { $set: { isFull: false }});
  await ParkingLotModel.findOneAndUpdate({ type: carPark.type }, { $inc: { free: 1}});

  return total;
};

const getAllNumberPlateByCarSize = async(type) => {
  const cars = await ParkCarModel.find({ type: type, timeOut: { $exists: false }}).lean();
  return _.map(cars, (car) => { 
    return {
      numberPlate: car.numberPlate,
      slotCode: car.slotCode,
      timeIn: car.timeIn
    }
  }); 
}

module.exports = {
  getFreeSlot,
  leaveParkCar,
  getAllNumberPlateByCarSize
};
