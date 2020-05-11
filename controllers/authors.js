const models = require('../models')

const getAllAuthors = async (request, response) => {
  try {
    const allAuthors = await models.authors.findAll()

    return response.send(allAuthors)
  } catch (error) {
    return response.status(500)
      .send('I try to create sympathy for my characters, then turn the 500 ERROR monsters loose. - Stephen King')
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
      : response.status(404)
        .send(`To produce a mighty book, you must choose a mighty theme, but not "${id}" - Herman Melville`)
  } catch (error) {
    return response.status(500).send('500 ERRORs are architecture, not interior decoration. - Ernest Hemingway')
  }
}

module.exports = { getAllAuthors, getAuthorByIdWithNovelsAndGenres }
