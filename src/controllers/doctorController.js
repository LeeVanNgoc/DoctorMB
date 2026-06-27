const doctorService = require("../services/doctorService");

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(
      req.body
    );

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}