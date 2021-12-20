const db = require('../models')
const { Restaurant } = db

module.exports = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({ raw: true })
      return res.render('admin/restaurants', { restaurants })
    } catch (err) {
      console.error(err)
    }
  },

  createPage: (req, res) => {
    return res.render('admin/create')
  },

  createRestaurant: async (req, res) => {
    try {
      const { name, tel, address, openingHours, description } = req.body

      if (!name) {
        req.flash('errorMessage', '名字必須填寫！')
        return res.redirect('back')
      }

      await Restaurant.create({
        name, tel, address, openingHours, description
      })

      req.flash('successMessage', '新增餐廳成功！')
      return res.redirect('/admin/restaurants')
    } catch (err) {
      console.error(err)
    }
  },

  getRestaurant: async (req, res) => {
    try {
      const restaurantId = Number(req.params.restaurantId)
      const restaurant = await Restaurant.findByPk(restaurantId, { raw: true })
      return res.render('admin/restaurant', { restaurant })
    } catch (err) {
      console.error(err)
    }
  },

  editPage: async (req, res) => {
    try {
      const restaurantId = Number(req.params.restaurantId)
      const restaurant = await Restaurant.findByPk(restaurantId, { raw: true })
      return res.render('admin/create', { restaurant })
    } catch (err) {
      console.error(err)
    }
  }
}
