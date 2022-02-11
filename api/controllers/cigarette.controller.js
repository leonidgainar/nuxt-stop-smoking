import Cigarette from '../models/cigarette'

async function addOrUpdateCigarettesAmount(date, amount, userId) {
  const record = await Cigarette.findOne({ userId, date })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })

  const totalAmount = parseInt(record?.amount || 0) + parseInt(amount)

  return await Cigarette.findOneAndUpdate(
    { userId, date },
    { userId, date, amount: totalAmount },
    { new: true, upsert: true }
  )
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function getCigarettesAmountByUserId(userId) {
  return await Cigarette.find({ userId })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function getCigarettesAmountByDate(date, userId) {
  return await Cigarette.find({ date, userId })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function deleteCigarettesAmount(id) {
  return await Cigarette.findOneAndRemove({ _id: id })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

export default {
  addOrUpdateCigarettesAmount,
  getCigarettesAmountByUserId,
  getCigarettesAmountByDate,

  deleteCigarettesAmount,
}
