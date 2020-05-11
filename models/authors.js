const authors = (connection, sequelize) => {
  return connection.define('authors', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nameFirst: { type: sequelize.STRING },
    nameLast: { type: sequelize.STRING }
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = authors
