const mongoose = require('mongoose');

const parkingSlotSchema = mongoose.Schema(
  {
    slotCode: { type: String, trim: true, index: true, required: true },
    isFull: { type: Boolean, required: true, index: true, default: false },
    type: { type: String, enum: ['small', 'medium', 'large'], index: true },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const ParkingSlotModel = mongoose.model('ParkingSlot', parkingSlotSchema);

module.exports = ParkingSlotModel;
