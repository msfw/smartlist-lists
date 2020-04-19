const mongoose = require('../../database/index')

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    user: {},
    items: [{}],
    type: {
        type: Number,
        default: 0,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

ListSchema.pre('save', async function (next) {
    if (!user)
        throw 'User is required'

    //if (!items)
    //    throw 'Items are required'

    next();
})

module.exports = mongoose.model('List', ListSchema);