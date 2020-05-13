const novelsGenres = (connection, sequelize, genres, novels) => {
  return connection.define('novelsGenres', {
    genreId: { type: sequelize.INTEGER, allowNull: false, primaryKey: true, references: { model: genres, key: 'id' } },
    novelId: { type: sequelize.INTEGER, allowNull: false, primaryKey: true, references: { model: novels, key: 'id' } },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = novelsGenres
