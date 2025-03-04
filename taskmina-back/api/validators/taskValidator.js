const { body } = require('express-validator');

const taskValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('dueDate').isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'),
    body('priority').isIn(['low', 'medium', 'high']).withMessage('La prioridad debe ser low, medium o high'),
  ];
};

module.exports = { taskValidationRules };