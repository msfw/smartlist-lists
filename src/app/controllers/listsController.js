const List = require('../models/list')

module.exports = {
    async getAll(req, res) {
        console.log('Entrou no getAll')
        const getErrors = res.__('get')
        console.log('carregou idioma')
        try {        
            
            console.log('Vai chama banco')
            const lists = await List.find({ 'user.email': req.query.userEmail });
            console.log('Chamou')
            return res.send({ lists })

        } catch (error) {
            console.log('Deu pau', error)
            return res.status(getErrors.status).send(getErrors.description)
        }
    },
    async getById(req, res) {
        const getErrors = res.__('get')
        try {
            const list = await List.findById(req.params.listId);
            return res.send({ list })
        } catch (error) {
            return res.status(getErrors.status).send(getErrors.description)
        }
    },

    async create(req, res) {
        const postErrors = res.__('post')
        try {

            let lists = undefined
    
            await List.insertMany(req.body)
                .then(docs => lists = docs)
                .catch(err => { throw (err) })
    
            return res.send({ lists })
        } catch (error) {
            return res.status(postErrors.status).send(`${postErrors.description} | Error: ${error}.`)
        } 
    },

    async update(req, res) {
        const putErrors = res.__('put')
        const { items, name, type } = req.body;

        try {
            const list = await List.findByIdAndUpdate(req.params.listId, {
                name,
                items,
                type
            }, { new: true });

            return res.send({ list })

        } catch (error) {
            return res.status(putErrors.status).send(putErrors.description)
        }
    },

    async delete(req, res) {
        const delErrors = res.__('del')
        try {
            const list = await List.findByIdAndRemove(req.params.listId);
            return res.send({ list })
        } catch (error) {
            return res.status(delErrors.status).send(delErrors.description)
        }
    }
}