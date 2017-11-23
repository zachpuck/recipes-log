'use strict';

const User = require('../model/user-model');

module.exports = router => {
  router.post('/signup', (req, res, next) => {
    console.log('what', req.body.email);
    return new User(req.body)
      .save()
      .then(user => res.json(user))
      .catch(next);
  });

  return router;
};