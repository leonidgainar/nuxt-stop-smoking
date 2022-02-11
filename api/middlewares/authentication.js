const passport = require('passport')

const verifyToken = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, message) => {
    if (err) {
      return res.status(400).send(err)
    } else if (!user) {
      return res.status(403).send({ message })
    } else {
      res.locals.loggedInUserId = user._id
    }
    next()
  })(res, req)
}

export default {
  verifyToken,
}
