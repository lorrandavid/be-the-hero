const connection = require('./../database/connection')
const generateUniqueId = require('./../utils/generateUniqueId')

class OngController {
    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)
    }

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body
        const id = generateUniqueId()
    
        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
    
            return res.json({ id })
        } catch (err) {
            return res.sendStatus(500)
        }
    }
}

module.exports = new OngController()