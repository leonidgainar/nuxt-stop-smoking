import { Router } from 'express'
import MoneyController from '../controllers/money.controller'

const router = Router()
const passport = require('passport')

router.post('/', (req, res) => {
  const date = req.body.date
  const amount = req.body.amount

  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, message) => {
      if (err) {
        return res.status(400).send(err)
      } else if (!user) {
        return res.status(403).send({ message })
      } else {
        await MoneyController.addOrUpdateMoneyAmount(date, amount, user._id)
          .then(() => {
            res.send({ message: 'Money amount has been added!' })
          })
          .catch((err) => {
            console.log(err)
            res
              .status(500)
              .send({ message: 'An error occured on adding money' })
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
        await MoneyController.getMoneyAmountByUserId(user._id)
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
      }
    }
  )(res, req)
})

router.get('/:date', (req, res) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, message) => {
      if (err) {
        return res.status(400).send(err)
      } else if (!user) {
        return res.status(403).send({ message })
      } else {
        await MoneyController.getMoneyAmountByDate(req.params.date, user._id)
          .then((data) => {
            res.send(...data)
          })
          .catch((err) => {
            console.log(err)
            res
              .status(500)
              .send({ message: 'An error occured on getting money amount' })
          })
      }
    }
  )(res, req)
})

router.delete('/:id', async (req, res) => {
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
