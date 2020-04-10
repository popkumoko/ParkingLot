"use strict";
const { parkingLotService } = require('../../src/services');
const expect = require('chai').expect;
const setupTestDB = require('../setupTestDB');

setupTestDB();
const { ParkingLotModel } = require('../../src/models');

describe('ParkingLotService', () => {
  describe('#CreateParkingLot', () => {
    it('Should have correct create parking lot.', async() => {
      const parkingLotData = {
          parkingSmall: {
            pricePerHour: 20,
            slotStart: 1,
            slotEnd: 10,
          },
          parkingMedium: {
            pricePerHour: 30,
            slotStart: 11,
            slotEnd: 20,
          },
          parkingLarge: {
            pricePerHour: 40,
            slotStart: 21,
            slotEnd: 30,
          }
        };

      const result = await parkingLotService.createParkingLot(parkingLotData);

      expect(result.length).to.eql(0);
    });

    it('Should have correct return duplicate slot code.', async() => {
      const parkingLotData = {
          parkingSmall: {
            pricePerHour: 20,
            slotStart: 1,
            slotEnd: 1,
          },
          parkingMedium: {
            pricePerHour: 30,
            slotStart: 1,
            slotEnd: 1,
          },
          parkingLarge: {
            pricePerHour: 40,
            slotStart: 2,
            slotEnd: 2,
          }
        };
      const result = await parkingLotService.createParkingLot(parkingLotData);

      expect(result.length).to.eql(1);
      expect(result[0]).to.eql('1');
    });
  });


  describe('#GetFreeSlot', () => {
    beforeEach( async() => {
      await ParkingLotModel.create({
        pricePerHour: 20,
        type: 'small',
        amount: 10,
        free: 10,
      });

      await ParkingLotModel.create({
        pricePerHour: 30,
        type: 'medium',
        amount: 20,
        free: 20,
      });

      await ParkingLotModel.create({
        pricePerHour: 40,
        type: 'large',
        amount: 10,
        free: 10,
      });
    });

    it('Should get correct free slot after create.', async() => {
      const result = await parkingLotService.getFreeSlot();

      expect(result.length).to.eql(3);
      expect(result[0].type).eql('small');
      expect(result[0].freeSlot).eql(10);
      expect(result[1].type).eql('medium');
      expect(result[1].freeSlot).eql(20);
      expect(result[2].type).eql('large');
      expect(result[2].freeSlot).eql(10);
    });

    it('Should have correct return free slot after car park.', async() => {
      await ParkingLotModel.findOneAndUpdate({ type: 'medium' }, { $inc: { free: -1 }});

      const result = await parkingLotService.getFreeSlot();

      expect(result.length).to.eql(3);
      expect(result[0].type).eql('small');
      expect(result[0].freeSlot).eql(10);
      expect(result[1].type).eql('medium');
      expect(result[1].freeSlot).eql(19);
      expect(result[2].type).eql('large');
      expect(result[2].freeSlot).eql(10);
    });

    it('Should have correct return free slot after car leave.', async() => {
      await ParkingLotModel.findOneAndUpdate({ type: 'medium' }, { $inc: { free: -1 }});
      await ParkingLotModel.findOneAndUpdate({ type: 'medium' }, { $inc: { free: 1 }});
      const result = await parkingLotService.getFreeSlot();

      expect(result.length).to.eql(3);
      expect(result[0].type).eql('small');
      expect(result[0].freeSlot).eql(10);
      expect(result[1].type).eql('medium');
      expect(result[1].freeSlot).eql(20);
      expect(result[2].type).eql('large');
      expect(result[2].freeSlot).eql(10);
    });
  });
});