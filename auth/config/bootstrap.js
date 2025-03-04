const consola = require('consola')
module.exports = async (HOST, PORT) => {
  consola.ready({ message: `auth taskmina en http://${HOST}:${PORT}`, badge: true })
}