const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const adminController = require('../controllers/adminController')
const restController = require('../controllers/restController')
const userController = require('../controllers/userController')

const { authenticated, authenticatedAdmin } = require('../middleware/checkAuth')

module.exports = (app, passport) => {
  app.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', authenticated, restController.getRestaurants)

  app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
  app.get('/admin/restaurants/create', authenticatedAdmin, adminController.createPage)
  app.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.createRestaurant)
  app.get('/admin/restaurants/:restaurantId', authenticatedAdmin, adminController.getRestaurant)
  app.get('/admin/restaurants/:restaurantId/edit', authenticatedAdmin, adminController.updatePage)
  app.put('/admin/restaurants/:restaurantId', authenticatedAdmin, upload.single('image'), adminController.updateRestaurant)
  app.delete('/admin/restaurants/:restaurantId', authenticatedAdmin, adminController.deleteRestaurant)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/signout', userController.signOut)
}
