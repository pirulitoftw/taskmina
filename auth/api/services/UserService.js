const { User } = require('../models')
const searchKeys = [ 'name', 'email', 'documentID', 'lastName']
module.exports = {
  fetch(deleted) {
    return User.find({ deleted }).select("-password")
  },

  /**
   * Buscar un usuario por id
   * @param {String} _id identificador unico
   */
  getOneByID(_id) {
    return User.findById(_id).select("-password")
  },

  /**
   * Busqueda de registros de usuario paginado.
   * @param {String} sort Orden por key { field: 'name', sortField: 'name', direction: 'desc' }
   * @param {Number} page Pagina actual
   * @param {Number} per_page Cantidad de registros por pagina
   * @param {String} search Cadena de busuera por searchKeys array
   * @returns 
   */
  table(sort, page, per_page, search, deleted) {
    console.log(search,'searchddddd');
    sort = sort.sortField ? { [sort.sortField]: sort.direction === 'asc' ? 1 : -1 } : {}
    const $or = search ? searchKeys.map(key => ({ [key]: { $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' }})) : [{}]
    const condition = deleted === undefined ? { $or } : { $or, deleted }
    return User.find(condition).limit(per_page).skip(per_page * (page - 1)).sort(sort).select('-password')
  },

  /**
   * Crear registro nuevo
   * @param {*} data datos para guardar
   * @returns 
   */
  create(data) {
    return User.create(data)
  },

  /**
   * Modificar un registro
   * @param {*} condition condicion para busqueda de registro a modificar
   * @param {*} data datos para sobrescribir
   * @returns 
   */
  update(condition, data) {
    return User.findOneAndUpdate(condition, data, { returnDocument: 'after' })
  },

  /**
   * Borrar registro
   * @param {Boolean} isSoftDelete Valor false para borrar de db permantentemente, true solo cambia estado(soft delete)
   * @param {String} _id identificacion unica de mongo 
   * @returns 
   */
  delete(_id, isSoftDelete = true) {
    if (isSoftDelete) {
      return User.findOneAndUpdate({ _id }, { deleted: true }, { returnDocument: 'after' })
    }
    return User.findOneAndDelete({ _id })
  },

  /**
   * Restaurar usuario
   * @param {*} _id idendificacion unica de mongo
   */
  restore(_id) {
    return User.findOneAndUpdate({ _id }, { deleted: false }, { returnDocument: 'after' })
  },

  /**
   * Total de registros
   * @param {Boolean} deleted Opcion [true] para los records con retirados, [false] para los activos, [undefined] ambas opciones a la ves  
   * @param {String} search Cadena de busuera por searchKeys array
   * @returns 
   */
  count(search, deleted) {
    // console.log('deleted', deleted)
    const $or = search ? searchKeys.map(key => ({ [key]: { $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' }})) : [{}]
    const condition = deleted === undefined ? { $or } : { $or, deleted }
    return User.countDocuments(condition)
  },
}