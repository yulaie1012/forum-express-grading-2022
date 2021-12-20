const db = require('../models')
const { Restaurant } = db

module.exports = {
  getRestaurants: async (req, res) => {
    const restaurants = await Restaurant.findAll({ raw: true })
    return res.render('admin/restaurants', { restaurants })
  }
}
