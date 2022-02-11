const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CigaretteBrandSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  price: { type: Number, required: true },
})

export default mongoose.model('CigaretteBrand', CigaretteBrandSchema)
