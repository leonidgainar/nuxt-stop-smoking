import { Router } from 'express'
import CigaretteBrandController from '../controllers/cigaretteBrand.controller'
import auth from '../middlewares/authentication'

const router = Router()

router.post('/', auth.verifyToken, async (req, res) => {
  const name = req.body.name
  const price = req.body.price

  await CigaretteBrandController.addOrUpdateCigaretteBrand(
    name,
    price,
    res.locals.loggedInUserId
  )
    .then(() => {
      res.send({ message: 'Cigarette brand has been added!' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ message: 'An error occured on adding cigarette brand' })
    })
})

router.get('/', auth.verifyToken, async (req, res) => {
  await CigaretteBrandController.getCigarettesBrandByUserId(
    res.locals.loggedInUserId
  )
    .then((data) => {
      const records = data.map(({ _id, name, price }) => {
        return { id: _id, name, price }
      })
      res.send([...records])
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: 'An error occured on getting cigarettes brand',
      })
    })
})

router.delete('/:id', auth.verifyToken, async (req, res) => {
  await CigaretteBrandController.deleteCigarettesBrand(req.params.id)
    .then(() => {
      res.send({ message: 'Cigarettes brand has been deleted!' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ message: 'An error occured on deleting cigarettes brand' })
    })
})

module.exports = router
