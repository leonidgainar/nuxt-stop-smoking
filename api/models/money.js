const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoneySchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
})

export default mongoose.model('Money', MoneySchema)
