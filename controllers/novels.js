const models = require('../models')

const getAllNovelsWithAuthorsAndGenres = async (request, response) => {
  try {
    const allNovels = await models.novels.findAll({
      include: [{ model: models.authors }, { model: models.genres }]
    })

    return response.send(allNovels)
  } catch (error) {
    return response.status(500).send('500 ERROR - COULDNT GET NOVELS')
  }
}

const getNovelByIdWithAuthorAndGenres = async (request, response) => {
  try {
    const { id } = request.params
    const matchingNovel = await models.novels.findOne({
      include: [{ model: models.authors }, { model: models.genres }],
      where: { id }
    })

    return matchingNovel
      ? response.send(matchingNovel)
      : response.status(404).send(`Could not find  ${id}`)
  } catch (error) {
    return response.status(500).send('500 ERROR')
  }
}

module.exports = { getAllNovelsWithAuthorsAndGenres, getNovelByIdWithAuthorAndGenres }
