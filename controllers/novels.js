const models = require('../models')

const getAllNovelsWithAuthorAndGenres = async (request, response) => {
  try {
    const allNovels = await models.novels.findAll({
      include: [{ model: models.authors }, { model: models.genres }]
    })

    return response.send(allNovels)
  } catch (error) {
    return response.status(500)
      .send('I love 500 ERRORs. I like the whooshing sound they make as they fly by. - Douglas Adams')
  }
}

const getNovelByParamWithAuthorAndGenres = async (request, response) => {
  try {
    const { param } = request.params
    const matchingNovel = await models.novels.findAll({
      include: [{ model: models.authors }, { model: models.genres }],
      where: {
        [models.Op.or]: [
          { id: { [models.Op.like]: param } },
          { title: { [models.Op.like]: `%${param.toLowerCase()}%` } }
        ]
      }
    })

    return matchingNovel
      ? response.send(matchingNovel)
      : response.status(404).send(`Requests for "${param}" are a lens to focus one's mind. - Ayn Rand`)
  } catch (error) {
    return response.status(500)
      .send('People do not deserve to have good 500 ERRORs, they are so pleased with bad. - Ralph Waldo Emerson')
  }
}

module.exports = { getAllNovelsWithAuthorAndGenres, getNovelByParamWithAuthorAndGenres }
