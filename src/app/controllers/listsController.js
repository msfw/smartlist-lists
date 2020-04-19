const List = require('../models/list')
const { post, put, get, del } = require('../../resources/listErrors')

module.exports = {
    async getAll(req, res) {
        try {        
            const lists = await List.find({ 'user.email': req.query.userEmail });
            return res.send({ lists })
        } catch (error) {
            return res.status(get.status).send(get.description)
        }
    },
    async getById(req, res) {
        try {
            const list = await List.findById(req.params.listId);
            return res.send({ list })
        } catch (error) {
            return res.status(get.status).send(get.description)
        }
    },

    async create(req, res) {
        try {

            let lists = undefined
    
            await List.insertMany(req.body)
                .then(docs => lists = docs)
                .catch(err => { throw (err) })
    
            return res.send({ lists })
        } catch (error) {
            return res.status(post.status).send(`${post.description} | Error: ${error}.`)
        } 
    },

    async update(req, res) {
        const { items, name } = req.body;

        try {
            const list = await List.findByIdAndUpdate(req.params.listId, {
                name,
                items
            }, { new: true });

            return res.send({ list })

        } catch (error) {
            return res.status(put.status).send(put.description)
        }
    },

    async delete(req, res) {
        try {
            const list = await List.findByIdAndRemove(req.params.listId);
            return res.send({ list })
        } catch (error) {
            return res.status(del.status).send(del.description)
        }
    }
}