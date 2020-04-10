"use strict";
const { parkCarService, parkingLotService } = require('../../src/services');
const expect = require('chai').expect;
const setupTestDB = require('../setupTestDB');

setupTestDB();
const { ParkCarModel } = require('../../src/models');

describe('ParkCarService', () => {
  beforeEach( async() => {
    const parkingLotData = {
      parkingSmall: {
        pricePerHour: 20,
        slotStart: 1,
        slotEnd: 5,
      },
      parkingMedium: {
        pricePerHour: 30,
        slotStart: 6,
        slotEnd: 10,
      },
      parkingLarge: {
        pricePerHour: 40,
        slotStart: 11,
        slotEnd: 15,
      }
    };

    await parkingLotService.createParkingLot(parkingLotData);
  });

  describe('#GetFreeSlotForPark', () => {
    it('Should have correct free slot by car size.', async() => {
      const result = await parkCarService.getFreeSlotForPark('Af-1231', 'small');

      expect(result).to.eql('1');
    });

    it('Should have correct free slot by car size after first leave.', async() => {
      const result1 = await parkCarService.getFreeSlotForPark('Af-1231', 'small');
      await parkCarService.leaveParkCar(result1);
      const result2 = await parkCarService.getFreeSlotForPark('Af-1231', 'small');

      expect(result1).to.eql('1');
      expect(result2).to.eql('1');
    });

    it('Should have correct free slot by car size for two car.', async() => {
      const result1 = await parkCarService.getFreeSlotForPark('Af-1231', 'small');
      const result2 = await parkCarService.getFreeSlotForPark('fb-1531', 'small');
      
      expect(result1).to.eql('1');
      expect(result2).to.eql('2');
    });

    it('Should have correct free slot by car size for difference size.', async() => {
      const result1 = await parkCarService.getFreeSlotForPark('Af-1231', 'small');
      const result2 = await parkCarService.getFreeSlotForPark('fb-1531', 'medium');
      const result3 = await parkCarService.getFreeSlotForPark('fbe-1531', 'large');
      
      expect(result1).to.eql('1');
      expect(result2).to.eql('6');
      expect(result3).to.eql('11');
    });
  });

  describe('#leaveParkCar', () => {
    it('Should have correct price by small size.', async() => {
      const slotCode = await parkCarService.getFreeSlotForPark('Af-1231', 'small');
      const price = await parkCarService.leaveParkCar(slotCode);

      expect(price).to.eql(20);
    });

    it('Should have correct price by medium size.', async() => {
      const slotCode = await parkCarService.getFreeSlotForPark('Af-1231', 'medium');
      const price = await parkCarService.leaveParkCar(slotCode);

      expect(price).to.eql(30);
    });

    it('Should have correct price by large size.', async() => {
      const slotCode = await parkCarService.getFreeSlotForPark('Af-1231', 'large');
      const price = await parkCarService.leaveParkCar(slotCode);

      expect(price).to.eql(40);
    });
  });

  describe('#getAllNumberPlateByCarSize', () => {
    beforeEach( async() => {
      await ParkCarModel.create({
        numberPlate: 'Af-1231'.toLowerCase(),
        slotCode: 1,
        timeIn: new Date(),
        type: 'small',
      });

      await ParkCarModel.create({
        numberPlate: '4f-1331'.toLowerCase(),
        slotCode: 2,
        timeIn: new Date(),
        type: 'small',
      });

      await ParkCarModel.create({
        numberPlate: '1f-5543'.toLowerCase(),
        slotCode: 6,
        timeIn: new Date(),
        type: 'medium',
      });
    });

    it('Should have correct number plate and slot code by car size.', async() => {
      const cars = await parkCarService.getAllNumberPlateByCarSize('small');

      expect(cars.length).to.eql(2);
      expect(cars[0].numberPlate).to.eql('af-1231');
      expect(cars[0].slotCode).to.eql('1');
      expect(cars[1].numberPlate).to.eql('4f-1331');
      expect(cars[1].slotCode).to.eql('2');
    });
  });
});