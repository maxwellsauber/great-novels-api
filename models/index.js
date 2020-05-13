
const sequelize = require('sequelize')
const authorsModels = require('./authors')
const novelsModels = require('./novels')
const genresModels = require('./genres')
const novelsGenresModels = require('./novelsGenres')

const connection = new sequelize('greatNovels', 'greatNovels', 'N0vel$!', {
  host: 'localhost', dialect: 'mysql'
})

const authors = authorsModels(connection, sequelize)
const novels = novelsModels(connection, sequelize, authors)
const genres = genresModels(connection, sequelize, novels)
const novelsGenres = novelsGenresModels(connection, sequelize, genres, novels)

authors.hasMany(novels)
novels.belongsTo(authors)

novels.belongsToMany(genres, { through: novelsGenres })
genres.belongsToMany(novels, { through: novelsGenres })

module.exports = { authors, novels, genres, novelsGenres }
