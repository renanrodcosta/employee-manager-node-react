import mongoose from 'mongoose'

const load = function(name) {
  return this.findOne({ name: name }).exec()
}

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true }
}, { versionKey: false })

Schema.statics = { load }

export default mongoose.model('Employee', Schema, 'employees')
