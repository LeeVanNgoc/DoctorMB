const Doctor = require("../models/Doctor");
const User = require("../models/User");

const createDoctor = async (doctorData) => {

  const user = await User.findById(doctorData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "doctor") {
    throw new Error("User is not a doctor");
  }
  const doctor = await Doctor.create(doctorData);

  return doctor;
}

module.exports = {
  createDoctor,
}