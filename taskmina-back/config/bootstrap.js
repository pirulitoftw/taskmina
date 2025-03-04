const consola = require('consola')
module.exports = async (HOST, PORT) => {
  consola.ready({ message: `task service running in http://${HOST}:${PORT}`, badge: true })
}