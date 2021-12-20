const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = bcrypt.hashSync('12345678', bcrypt.genSaltSync(10))

    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Root',
      email: 'root@example.com',
      password: hashPassword,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    await queryInterface.bulkInsert('Users',
      Array.from({ length: 5 })
        .map((element, index) => ({
          id: index * 10 + 11,
          name: `User${index + 1}`,
          email: `user${index + 1}@example.com`,
          password: hashPassword,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
