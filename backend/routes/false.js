const router = require('express').Router();
let False = require('../models/false.model');

router.route('/').get((req, res) => {
    False.find()
    .then(fals => res.json(fals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const eq = req.body.eq;
  const xl = req.body.xl;
  const xr = req.body.xr;
  const XM = req.body.xm;
  const FXL = req.body.fxl;
  const FXR = req.body.fxr;
  const FXM = req.body.fxm;
  const error = req.body.error;

  const newFalse = new False({
    eq,
    xl,
    xr,
    XM,
    FXL,
    FXR,
    FXM,
    error
  });

newFalse.save()
  .then(() => res.json('False added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


  
module.exports = router;