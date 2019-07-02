import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true }
}, { versionKey: false })

const Department = mongoose.model('Department', schema, 'departments')

export default Department
