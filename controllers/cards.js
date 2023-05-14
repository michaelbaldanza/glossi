const Card = require('../models/deck');

async function create(req, res) {
  const userId = req.user._id;
  console.log('hitting create card')
  console.log(req);
}

module.exports = {
  create: create,
};