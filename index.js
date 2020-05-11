const express = require('express')
const { getAllAuthors, getAuthorByIdWithNovelsAndGenres } = require('./controllers/authors')
const { getAllGenres, getGenreByIdWithNovelsAndAuthors } = require('./controllers/genres')
const { getAllNovelsWithAuthorsAndGenres, getNovelByIdWithAuthorAndGenres } = require('./controllers/novels')

const app = express()

app.get('/authors', getAllAuthors)
app.get('/authors/:id', getAuthorByIdWithNovelsAndGenres)

app.get('/genres', getAllGenres)
app.get('/genres/:id', getGenreByIdWithNovelsAndAuthors)

app.get('/novels', getAllNovelsWithAuthorsAndGenres)
app.get('/novels/:id', getNovelByIdWithAuthorAndGenres)

app.all('*', (req, res) => res.status('404').send('NOT FOUNDS'))

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
