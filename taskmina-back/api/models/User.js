const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const SALT_ROUNDS = 12

const userSchema = {
  name: { type: String },
  lastName: { type: String },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6 
  },
  type: { 
    type: String, 
    default: 'user', 
    enum: ['user', 'admin', 'project_manager'] 
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'banned']
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}

const schema = new mongoose.Schema(userSchema, { 
  timestamps: true,
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
})

schema.pre('save', async function(next) {
  try {
    const user = this
    if (!user.isModified('password')) return next()
    
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('User', schema)