const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config.json');
var userSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        min: [5, 'Too short, min is 5 characters'],
        max: [50, 'Too long, max is 32 characters'],
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'any')) {
                throw new Error('phone is invalid')
            }
        }
    },
    email: {
        type: String,
        type: String,
        min: [5, 'Too short, min is 5 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    address: {
        type: String,
        trim: true,
        min: 4,
        max: 100
    }, password: {
        type: String,

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

},
    { timestamps: true })

userSchema.virtual('Devices', {
    ref: 'Location',
    localField: '_id',
    foreignField: 'user_id'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    if (user) {
        const token = jwt.sign({ _id: user._id.toString() }, config.secret);
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token;
    }
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('User account not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('password error')
    return user
}
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
