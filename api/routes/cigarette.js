import { Router } from 'express'
import CigaretteController from '../controllers/cigarette.controller'
import auth from '../middlewares/authentication'

const router = Router()

router.post('/', auth.verifyToken, async (req, res) => {
  const date = req.body.date
  const amount = req.body.amount

  await CigaretteController.addOrUpdateCigarettesAmount(
    date,
    amount,
    res.locals.loggedInUserId
  )
    .then(() => {
      res.send({ message: 'Cigaterres amount has been added!' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'An error occured on adding cigarettes' })
    })
})

router.get('/', auth.verifyToken, async (req, res) => {
  await CigaretteController.getCigarettesAmountByUserId(
    res.locals.loggedInUserId
  )
    .then((data) => {
      const records = data.map(({ _id, date, amount }) => {
        const formatedDate = new Date(date).toLocaleDateString()
        return { id: _id, date: formatedDate, amount }
      })
      res.send([...records])
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: 'An error occured on getting cigarettes amount',
      })
    })
})

router.get('/:date', auth.verifyToken, async (req, res) => {
  await CigaretteController.getCigarettesAmountByDate(
    req.params.date,
    res.locals.loggedInUserId
  )
    .then((data) => {
      res.send(...data)
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ message: 'An error occured on getting cigarette amount' })
    })
})

router.delete('/:id', auth.verifyToken, async (req, res) => {
  await CigaretteController.deleteCigarettesAmount(req.params.id)
    .then(() => {
      res.send({ message: 'Cigarette amount has been deleted!' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ message: 'An error occured on deleting cigarette amount' })
    })
})

module.exports = router
