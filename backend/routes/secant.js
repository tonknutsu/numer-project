const router = require('express').Router();
let Secant = require('../models/secant.model');

router.route('/').get((req, res) => {
          Secant.find()
    .then(secant => res.json(secant))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const E = req.body.E;
  const x0 = req.body.x0;
  const x1 = req.body.x1;
  const XN = req.body.XN;
  const error = req.body.error;

  const newSecant = new Secant({
    E,
    x0,
    x1,
    XN,
    error
  });

  newSecant.save()
  .then(() => res.json('Secant added!'))
  .catch(() => res.json('Error: Secant Fail!'));
});



  
module.exports = router;