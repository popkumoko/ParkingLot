const mongoose = require('mongoose');

const parkingLotSchema = mongoose.Schema(
  {
    amount: { type: Number },
    free: { type: Number },
    pricePerHour: { type: Number, required: true },
    type: { type: String, enum: ['small', 'medium', 'large'], index: true },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const ParkingLotModel = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = ParkingLotModel;
