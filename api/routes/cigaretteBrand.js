import { Router } from 'express'
import CigaretteBrandController from '../controllers/cigaretteBrand.controller'

const router = Router()
const passport = require('passport')

router.post('/', (req, res) => {
  const name = req.body.name
  const price = req.body.price

  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, message) => {
      if (err) {
        return res.status(400).send(err)
      } else if (!user) {
        return res.status(403).send({ message })
      } else {
        await CigaretteBrandController.addOrUpdateCigaretteBrand(
          name,
          price,
          user._id
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
      }
    }
  )(res, req)
})

router.get('/', (req, res) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, message) => {
      if (err) {
        return res.status(400).send(err)
      } else if (!user) {
        return res.status(403).send({ message })
      } else {
        await CigaretteBrandController.getCigarettesBrandByUserId(user._id)
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
      }
    }
  )(res, req)
})

router.delete('/:id', async (req, res) => {
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
