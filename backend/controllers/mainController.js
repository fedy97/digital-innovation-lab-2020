const Info = require('../models/mainModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllInfo = catchAsync(async (req, res, next) => {

  const features = Info.find();
  const infos = await features;

  res.status(200).json({
    status: 'success',
    requestedAt: req.time,
    results: infos.length,
    data: {
      infos: infos
    }
  });
});
