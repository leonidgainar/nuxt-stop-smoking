import { Router } from 'express'
import MoneyController from '../controllers/money.controller'
import auth from '../middlewares/authentication'

const router = Router()

router.post('/', auth.verifyToken, async (req, res) => {
  const date = req.body.date
  const amount = req.body.amount

  await MoneyController.addOrUpdateMoneyAmount(
    date,
    amount,
    res.locals.loggedInUserId
  )
    .then(() => {
      res.send({ message: 'Money amount has been added!' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'An error occured on adding money' })
    })
})

router.get('/', auth.verifyToken, async (req, res) => {
  await MoneyController.getMoneyAmountByUserId(res.locals.loggedInUserId)
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
        message: 'An error occured on getting money amount',
      })
    })
})

router.get('/:date', auth.verifyToken, async (req, res) => {
  await MoneyController.getMoneyAmountByDate(
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
        .send({ message: 'An error occured on getting money amount' })
    })
})

router.delete('/:id', auth.verifyToken, async (req, res) => {
  await MoneyController.deleteMoneyAmount(req.params.id)
    .then(() => {
      res.send({ message: 'Money amount has been deleted!' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ message: 'An error occured on deleting money amount' })
    })
})

module.exports = router
