const models = require('../models')

const getAllGenres = async (request, response) => {
  try {
    const allGenres = await models.genres.findAll()

    return response.send(allGenres)
  } catch (error) {
    return response.status(500).send('500 ERROR Genres')
  }
}

const getGenreByIdWithNovelsAndAuthors = async (request, response) => {
  try {
    const { id } = request.params
    const matchingGenre = await models.genres.findOne({
      include: [{
        include: [{ model: models.authors }],
        model: models.novels,
      }],
      where: { id },
    })

    return matchingGenre
      ? response.send(matchingGenre)
      : response.status(404).send(`Could not find ${id}`)
  } catch (error) {
    return response.status(500).send('500 ERROR')
  }
}

module.exports = { getAllGenres, getGenreByIdWithNovelsAndAuthors }
