const express = require('express')
const User = require('../models/user')
const userauth = require('../middleware/user')
const router = new express.Router()

//api to create and register new user
router.post('/register', async (req, res, next) => {
    try {
        const user = new User(
            req.body
        )
        await user.save().then(() => res.status(200).send(user))
    } catch (e) {
        return res.status(400).send(e)
    }
})
//api to login user
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (user.status == 2) {
            return res
                .status(400)
                .json({ status: 0, message: 'sorry but your account blocked' });
        }
        else {
            const token = await user.generateAuthToken()
            res.send({ user, token })
        }
    } catch (err) {
        res.status(400).json({ message: 'Username or password is incorrect' })

    }
})

module.exports = router