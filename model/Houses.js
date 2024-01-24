const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 1, // optional validation for minimum bedrooms
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 1, // optional validation for minimum bathrooms
  },
  roomSize: {
    type: Number,
    required: true,
    min: 1, // optional validation for minimum room size
  },
  picture: {
    type: String,
    required: true,
    validate: {
      validator: (url) => {
        // You can add a more robust URL validation here
        return url.startsWith("https://") || url.startsWith("http://");
      },
      message: "Invalid picture URL",
    },
  },
  availabilityDate: {
    type: Date,
    required: true,
    min: Date.now, // ensure availability date is in the future
  },
  rentPerMonth: {
    type: Number,
    required: true,
    min: 0, // optional validation for minimum rent
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (phoneNumber) => {
        // You can add a more robust phone number validation here
        const regex = /^(\+88)?01\d{9}$/;
        return regex.test(phoneNumber);
      },
      message: "Invalid phone number format",
    },
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("House", houseSchema);
