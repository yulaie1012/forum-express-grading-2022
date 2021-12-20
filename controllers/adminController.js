const db = require('../models')
const { Restaurant } = db

module.exports = {
  getRestaurants: async (req, res) => {
    const restaurants = await Restaurant.findAll({ raw: true })
    return res.render('admin/restaurants', { restaurants })
  },

  createPage: async (req, res) => {
    return res.render('admin/create')
  },

  createRestaurant: async (req, res) => {
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
  }
}
