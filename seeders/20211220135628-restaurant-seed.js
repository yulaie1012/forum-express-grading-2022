const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 50 })
        .map((element, index) => ({
          id: index * 10 + 1,
          name: faker.name.findName(),
          tel: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          openingHours: '08:00',
          image: `https://loremflickr.com/320/240/restaurant,food/?random=${index}`,
          description: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
        ), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {})
  }
}
