const mongoose = require('mongoose');

const parkCarSchema = mongoose.Schema(
  {
    numberPlate: { type: String, trim: true, index: true },
    slotCode: { type: String, index: true },
    timeIn: { type: Date, required: true, index: true },
    timeOut: { type: Date, index: true },
    type: { type: String, enum: ['small', 'medium', 'large'], index: true },
    total: { type: Number },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const ParkCarModel = mongoose.model('ParkCar', parkCarSchema);

module.exports = ParkCarModel;
