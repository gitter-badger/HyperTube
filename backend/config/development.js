module.exports = {
  db: {
    host: 'localhost',
    port: '27017',
    dbName: 'hypertube',
  },
  server: {
    port: '8080',
    url: 'http://127.0.0.1:8080',
  },
  jwt: {
    secret: '1l0v3s3cr3t',
  },
  password: {
    algorithm: 'aes-256-ctr',
    key: '1l0v3k3ys',
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

