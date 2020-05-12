const models = require('../models')
const modelsAuthorsGenresIncludes = [{ model: models.authors }, { model: models.genres }]

const getAllNovelsWithAuthorAndGenres = async (request, response) => {
  try {
    const allNovels = await models.novels.findAll({
      include: modelsAuthorsGenresIncludes
    })

    return response.send(allNovels)
  } catch (error) {
    return response.status(500)
      .send('I love 500 ERRORs. I like the whooshing sound they make as they fly by. - Douglas Adams')
  }
}

const getNovelByIdWithAuthorAndGenres = async (request, response) => {
  try {
    const { id } = request.params
    const matchingNovel = await models.novels.findOne({
      include: modelsAuthorsGenresIncludes,
      where: { id }
    })

    return matchingNovel
      ? response.send(matchingNovel)
      : response.status(404).send(`Requests for "${id}" are a lens to focus one's mind. - Ayn Rand`)
  } catch (error) {
    return response.status(500)
      .send('People do not deserve to have good 500 ERRORs, they are so pleased with bad. - Ralph Waldo Emerson')
  }
}

module.exports = { getAllNovelsWithAuthorAndGenres, getNovelByIdWithAuthorAndGenres }
