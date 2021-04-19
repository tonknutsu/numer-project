const router = require('express').Router();
let Newton = require('../models/newton.model');

router.route('/').get((req, res) => {
     Newton.find()
    .then(newton => res.json(newton))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const E = req.body.E;
  const E2 = req.body.E2;
  const x = req.body.x;
  const xNew = req.body.xNew;
  const error = req.body.error;
  
  const newNewton = new Newton({
    E,
    E2,
    x,
    xNew,
    error

  });

newNewton.save()
  .then(() => res.json('Newton added!'))
  .catch(() => res.json('Error: Newton Fail!'));
});

  
module.exports = router;