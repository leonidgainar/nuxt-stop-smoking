import { Router } from 'express'
import AuthenticationController from '../controllers/authentication.controller'

const passport = require('passport')
const router = Router()

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err) {
      return res.status(500).send(err)
    } else if (!user) {
      return res.status(403).send(message)
    } else {
      const token = AuthenticationController.signUserToken(user)
      return res.send({ token })
    }
  })(req, res)
})

router.get('/user', (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, message) => {
    if (err) {
      return res.status(400).send(err)
    } else if (!user) {
      return res.status(403).send({ message })
    } else {
      return res.send({ user })
    }
  })(res, req)
})

router.post('/register', async (req, res) => {
  const password = req.body.password
  const email = req.body.email
  const hashedPassword = await AuthenticationController.generatePasswordHash(
    password
  )

  await AuthenticationController.createUser(email, hashedPassword)
    .then(() => {
      res.send({ message: 'An account has been created!' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(409)
        .send({ message: 'An error occured on creating new account' })
    })
})

module.exports = router
