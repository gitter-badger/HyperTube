import { handleError, ValidationError } from "../utils/errors.js"

const allowedGenre = [
  'Action',
  'Adventure',
  'Western',
  'War',
  'Thriller',
  'Sport',
  'Sci',
  'Romance',
  'Mystery',
  'Musical',
  'Music',
  'Horror',
  'History',
  'Film',
  'Fantasy',
  'Family',
  'Drama',
  'Documentary',
  'Crime',
  'Comedy',
  'Biography',
  'Animation'
]

const allowedSorts = [
  'title',
  'year',
  'rating',
  'peers',
  'seeds',
  'download_count',
  'like_count',
  'date_added',
]

export const getSuggestions = (req, res, next) => {
  if (req.query.genre && allowedGenre.every((g) => req.query.genre !== g)) {
    return handleError(new ValidationError('genre', 'invalid'), res)
  }

  next()
}

export const searchMovies = (req, res, next) => {
  if (req.query.genre && allowedGenre.every((g) => req.query.genre !== g)) {
    return handleError(new ValidationError('genre', 'invalid'), res)
  }

  if (req.query.sort_by && allowedSorts.every((s) => req.query.sort_by !== s)) {
    return handleError(new ValidationError('sort_by', 'invalid'), res)
  }

  if (!req.query.query_term) {
    return handleError(new ValidationError('query_term', 'missing'), res)
  }
  next()
}
