module.exports = {
  database: {
    url: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
  api: process.env.API_HOST || 'http://localhost:80',
}
