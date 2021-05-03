console.log(process.env.DATABASE_URL)

module.exports = {
    host: process.env.DATABASE_URL
  }