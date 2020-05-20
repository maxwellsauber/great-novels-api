const express = require('express')
const { getAllAuthors, getAuthorsByParamWithNovelsAndGenres } = require('./controllers/authors')
const { getAllGenres, getGenreByIdWithNovelsAndAuthors } = require('./controllers/genres')
const { getAllNovelsWithAuthorAndGenres, getNovelsByParamWithAuthorAndGenres } = require('./controllers/novels')

const app = express()

app.get('/authors', getAllAuthors)
app.get('/authors/:param', getAuthorsByParamWithNovelsAndGenres)

app.get('/genres', getAllGenres)
app.get('/genres/:id', getGenreByIdWithNovelsAndAuthors)

app.get('/novels', getAllNovelsWithAuthorAndGenres)
app.get('/novels/:param', getNovelsByParamWithAuthorAndGenres)

app.all('*', (request, response) => response.status('404')
  .send('A poet can survive everything but a 404 ERROR. - Oscar Wilde'))

app.listen(1337, () => {
  console.log('Fiction is about stuff that\'s on PORT 1337. - Nancy Kress.') // eslint-disable-line no-console
})
