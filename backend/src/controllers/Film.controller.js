import { handleError, NotFoundError } from "../utils/errors.js"

export const getAllFilms = (req, res, next) => {
  Film.find({})
    .then(films => {
      if (!films || !films.length) { return res.json({ results: [], message: 'No films found' }) }
      res.json({
        results: films.map(f => f.serialize),
        message: 'Films found',
      })
    })
    .catch(err => handleError(err, res, 'Error while getting films'))
}

export const getFilmById = (req, res, next) => {
  Film.findById(req.params.id)
    .then(foundFilm => {
      if (!foundFilm) { return Promise.reject(new NotFoundError('Film')) }
      res.json({
        results: foundFilm.serialize,
        message: 'Film found',
      })
    })
    .catch(err => handleError(err, res, 'Error while getting film'))
}

export const searchFilms = (req, res, next) => {
}
