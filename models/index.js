
const sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')

const authorsModels = require('./authors')
const novelsModels = require('./novels')
const genresModels = require('./genres')
const novelsGenresModels = require('./novelsGenres')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

const authors = authorsModels(connection, sequelize)
const novels = novelsModels(connection, sequelize, authors)
const genres = genresModels(connection, sequelize, novels)
const novelsGenres = novelsGenresModels(connection, sequelize, genres, novels)

authors.hasMany(novels)
novels.belongsTo(authors)

novels.belongsToMany(genres, { through: novelsGenres })
genres.belongsToMany(novels, { through: novelsGenres })

module.exports = {
  authors,
  novels,
  genres,
  novelsGenres,
  Op: sequelize.Op
}
