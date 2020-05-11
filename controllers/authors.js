const models = require('../models')

const getAllAuthors = async (request, response) => {
  try {
    const allAuthors = await models.authors.findAll()

    return response.send(allAuthors)
  } catch (error) {
    return response.status(500).send('500 ERROR - Could not getAllAuthors')
  }
}

const getAuthorByIdWithNovelsAndGenres = async (request, response) => {
  try {
    const { id } = request.params
    const matchingAuthor = await models.authors.findOne({
      include: [{
        include: [{ model: models.genres }],
        model: models.novels
      }],
      where: { id }
    })

    return matchingAuthor
      ? response.send(matchingAuthor)
      : response.status(404).send(`No author matching ${id}`)
  } catch (error) {
    return response.status(500).send('500 ERROR - Could not getAuthorByIdWithNovelsAndGenres')
  }
}

module.exports = { getAllAuthors, getAuthorByIdWithNovelsAndGenres }
