const connection = require('./../database/connection')

class IncidentController {
    async index(req, res) {
        const { page = 1 } = req.query
        const [ count ] = await connection('incidents').count()
        const ongs = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.city', 'ongs.uf'])

        res.header('X-Total-Count', count['count(*)'])
        
        return res.json(ongs)
    }

    async create(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        try {
            const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            })

            return res.json({ id })
        } catch (err) {
            return res.sendStatus(500)
        }
    }

    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization
        const incident = await connection('incidents').where('id', id).select('ong_id').first()

        if (!incident || incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }
        
        try {
            await connection('incidents').where('id', id).delete()
            return res.sendStatus(204)
        } catch (err) {
            return res.sendStatus(500)
        }
    }
}

module.exports = new IncidentController()