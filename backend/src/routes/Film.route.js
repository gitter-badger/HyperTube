import * as filmController from "../controllers/Film.controller.js"
import * as filmValidator from "../validators/Film.validator.js"

export default [
  {
    method: 'GET',
    path: '/films',
    validators: [],
    handler: filmController.getAllFilms,
  },
  {
    method: 'GET',
    path: '/films/search',
    validators: [],
    handler: filmController.searchFilms,
  },
  {
    method: 'GET',
    path: '/films/:id',
    validators: [],
    handler: filmController.getFilmById,
  }
]
