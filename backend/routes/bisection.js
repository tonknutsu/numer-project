const router = require('express').Router();
let Bisection = require('../models/bisection.model');

router.route('/').get((req, res) => {
  Bisection.find()
    .then(bisection => res.json(bisection))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const eq = req.body.eq;
  const xl = req.body.xl;
  const xr = req.body.xr;
  const xm = req.body.XM;
  const fxl = req.body.FXL;
  const fxr = req.body.FXR;
  const fxm = req.body.FXM;
  const error = req.body.error;

  const newBisection = new Bisection({
    eq,
    xl,
    xr,
    xm,
    fxl,
    fxr,
    fxm,
    error
  });

  newBisection.save()
  .then(() => res.json('Bisection added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;