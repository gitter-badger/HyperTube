import pirateBay from 'thepiratebay'

const searchFilms = (research) => {
  return Promise.all([pirateBay.search(research), Promise.resolve(null)])
    .then((res) => Promise.resolve(res[0].concat(res[1])))
}
