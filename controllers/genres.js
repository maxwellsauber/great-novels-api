const models = require('../models')

const getAllGenres = async (request, response) => {
  try {
    const allGenres = await models.genres.findAll()

    return response.send(allGenres)
  } catch (error) {
    return response.status(500)
      .send('It is perfectly okay to return 500 ERRORs — as long as you return them brilliantly. - C.J.Cherryh')
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
      : response.status(404)
        .send(`Not that the story need be long, but requesting "${id}" will make it short. - Henry David Thoreau`)
  } catch (error) {
    return response
      .status(500).send('A 500 ERROR is God\'s way of telling us how hard it to be God. - Sidney Sheldon')
  }
}

module.exports = { getAllGenres, getGenreByIdWithNovelsAndAuthors }
