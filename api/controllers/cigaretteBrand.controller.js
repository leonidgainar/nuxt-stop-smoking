import CigaretteBrand from '../models/cigaretteBrand'

async function addOrUpdateCigaretteBrand(name, price, userId) {
  return await CigaretteBrand.findOneAndUpdate(
    { userId, name },
    { userId, name, price: parseFloat(price) },
    { new: true, upsert: true }
  )
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function getCigarettesBrandByUserId(userId) {
  return await CigaretteBrand.find({ userId })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

async function deleteCigarettesBrand(id) {
  return await CigaretteBrand.findOneAndRemove({ _id: id })
    .then((data) => {
      return data
    })
    .catch((error) => {
      throw error
    })
}

export default {
  addOrUpdateCigaretteBrand,
  getCigarettesBrandByUserId,
  deleteCigarettesBrand,
}
