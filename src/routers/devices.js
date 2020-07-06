const express = require('express');
const router = express.Router();
const Devices = require('../models/devices')
const User = require('../models/user')
const userauth = require('../middleware/user')

//api to create new device
router.post('/device', userauth, async (req, res) => {
    try {
        const devices = new Devices({
            ...req.body,
            user_id: req.user._id
        })
        await devices.save().then(() => res.status(200).send(devices))
    } catch (e) {
        return res.status(400).send(e)
    }
})
//api to get user devices
router.get('/user_devices', userauth, async (req, res) => {
    const devices = await Devices.find({ user_id: req.user._id })
    const user = await User.find({ _id: req.user._id })
    try {
        if (devices.user_id == user._id) {
            res.status(200).send(devices)
        }
    } catch (e) {
        res.status(400).send()
    }
})
//api to add or edit data of device
router.patch('/device/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const devices = await Devices.findById(req.params.id)
        updates.forEach((update) => devices[update] = req.body[update])
        await devices.save()
        if (!devices) {
            return res.status(404).send()
        }
        res.send(devices)
    } catch (e) {
        res.status(400).send(e)
    }

})


module.exports = router;