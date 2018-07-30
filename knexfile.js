// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres//localhost/g90-server'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
}
