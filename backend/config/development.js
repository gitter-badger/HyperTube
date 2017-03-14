module.exports = {
  db: {
    host: '127.0.0.1',
    port: '27017',
    dbName: 'hypertube',
  },
  server: {
    port: '8080',
  },
  urls: {
    api: 'http://127.0.0.1:8080',
    front: 'http://127.0.0.1:8000',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  logger: [
    {
      type: 'Console',
      configuration: {
        handleExceptions: true,
        level: 'silly',
        colorize: true,
      },
    },
    {
      type: 'File',
      configuration: {
        level: 'silly',
        filename: 'hypertube-backend.log',
        maxsize: 5242880,
        handleExceptions: true,
      }
    }
  ],
}

