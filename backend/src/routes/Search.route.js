import * as searchController from "../controllers/Search.controller.js"
import * as searchValidator from "../validators/Search.validator.js"

export default [
  {
    method: 'GET',
    path: '/search/suggest',
    validators: [searchValidator.getSuggestions],
    handler: searchController.getSuggestions,
  },
  {
    method: 'GET',
    path: '/search',
    validators: [searchValidator.searchMovies],
    handler: searchController.searchMovies,
  },
  {
    method: 'GET',
    path: '/search/:movie_id',
    validators: [],
    handler: searchController.getMovieById,
  }
]
