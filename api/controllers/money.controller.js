import Money from '../models/money'

async function addOrUpdateMoneyAmount(date, amount, userId) {
  const record = await Money.findOne({ userId, date })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })

  const totalAmount = parseFloat(record?.amount || 0) + parseFloat(amount)

  return await Money.findOneAndUpdate(
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

async function getMoneyAmountByUserId(userId) {
  return await Money.find({ userId })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function getMoneyAmountByDate(date, userId) {
  return await Money.find({ date, userId })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function deleteMoneyAmount(id) {
  return await Money.findOneAndRemove({ _id: id })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

export default {
  addOrUpdateMoneyAmount,
  getMoneyAmountByUserId,
  getMoneyAmountByDate,
  deleteMoneyAmount,
}
