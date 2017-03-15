import { handleError } from "../utils/errors.js"
import rp from "request-promise"
import filter from "filter-object"
import { torrentToMagnet } from "../utils/yts.js"

const serializeMovie = (m) => filter(m, '{medium_cover_image,title,id,imdb_code}')

const createFormattedRequest = (permitted, generalAttr) => (req, res) => {
  rp({
    uri: 'https://yts.ag/api/v2/list_movies.json',
    qs: Object.assign(generalAttr, filter(req.query, permitted)),
    json: true,
  })
    .then((foundMovies) => {
      if (!foundMovies.data.movies || !foundMovies.data.movies.length)
      { return res.json({ results: [], message: 'No movies found' }) }
      res.json({
        results: foundMovies.data.movies.map(serializeMovie),
        message: 'Found movies',
      })
    })
    .catch((err) => handleError(err, res, 'Error while searching YTS'))
}

export const getSuggestions = createFormattedRequest(
  '{page,genre}',
  { limit: 50, sort_by: 'ratings' }
)

export const searchMovies = createFormattedRequest(
  '{page,genre,sort_by,query_term}',
  { limit: 50, sort_by: 'title', order_by: 'asc' }
)

export const getMovieById = (req, res) => {
  rp({
    uri: 'https://yts.ag/api/v2/movie_details.json',
    qs: { movie_id: req.params.movie_id },
    json: true,
  })
    .then((foundMovie) => {
      if (!foundMovie || !foundMovie.data || !foundMovie.data.movie)
      { return res.json({ results: null, message: 'Movie not found' }) }

      const baseMovie = foundMovie.data.movie
      const destMovie = filter(baseMovie,
        '{title,genre,medium_cover_image,background_image,id,imdb_code}')
      destMovie.description = baseMovie.description_full
      destMovie.torrents = baseMovie.torrents.map((torrent) => ({
        magnet: torrentToMagnet(torrent.hash, baseMovie.title),
        quality: torrent.quality,
        seeds: torrent.seeds,
        peers: torrent.peers,
      }))
      res.json({ results: destMovie, message: 'Found Movie' })
    })
}
