'use strict';

const Recipe = require('../model/recipe-model');

module.exports = router => {
  router.post('/recipes', (req, res, next) => {
    return new Recipe(req.body)
      .save()
      .then(recipe => res.json(recipe))
      .catch(next);
  });

  return router;
};