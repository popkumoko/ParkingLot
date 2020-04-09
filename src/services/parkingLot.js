'use strict';
const { ParkingSlotModel, ParkingLotModel } = require('../models');
const _ = require('lodash');

const addNewParkingSlot = async(parkingSlotData, type) => {
  let duplicateSlotCode = [];
  let count = 0;
  for(let i = parkingSlotData.slotStart; i <= parkingSlotData.slotEnd; i++) {
    const slotCode = i.toString();
    const slot = await ParkingSlotModel.findOne({ slotCode: slotCode });
    if(slot) {
      duplicateSlotCode.push(slotCode);
      continue;
    }

    await ParkingSlotModel.create({
      slotCode: slotCode,
      isFull: false,
      type: type
    });

    count++;
  }

  return { duplicateSlotCode, count };
}

const createParkingLot = async(parkingData) => {
  let duplicateSlotCode = [];
  if(parkingData.parkingSmall) {
    const result = await addNewParkingSlot(parkingData.parkingSmall, 'small');
    await ParkingLotModel.create({
      pricePerHour: parkingData.parkingSmall.pricePerHour,
      type: 'small',
      amount: result.count,
      free: result.count,
    });

    duplicateSlotCode = _.union(duplicateSlotCode, result.duplicateSlotCode);
  }

  if(parkingData.parkingMedium) {
    const result = await addNewParkingSlot(parkingData.parkingMedium, 'medium');
    await ParkingLotModel.create({
      pricePerHour: parkingData.parkingMedium.pricePerHour,
      type: 'medium',
      amount: result.count,
      free: result.count,
    });

    duplicateSlotCode = _.union(duplicateSlotCode, result.duplicateSlotCode);
  }

  if(parkingData.parkingLarge) {
    const result = await addNewParkingSlot(parkingData.parkingLarge, 'large');
    await ParkingLotModel.create({
      pricePerHour: parkingData.parkingLarge.pricePerHour,
      type: 'large',
      amount: result.count,
      free: result.count,
    });

    duplicateSlotCode = _.union(duplicateSlotCode, result.duplicateSlotCode);
  }

  return duplicateSlotCode;
};

const getFreeSlot = async() => {
  const parkingLots = await ParkingLotModel.find();
  return _.map(parkingLots, (parking) => { 
    return {
      type: parking.type,
      freeSlot: parking.free,
      pricePerHour: parking.pricePerHour
    }
  });
};

module.exports = {
  createParkingLot,
  getFreeSlot
};
