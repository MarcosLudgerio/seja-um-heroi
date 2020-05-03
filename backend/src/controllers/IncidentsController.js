const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { title, description, value } = req.body;
        
        const ong_id = req.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return res.json({ id });
    },
    async index(req, res){

        const { page = 1 } = req.query;

        const [ count ] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.cidade',
                'ongs.uf'
            ]);
        
        res.header("X-Total-Count", count['count(*)']);

        return res.json(incidents)
    },
    async delete(req, res){
        const { id } = req.params;
        const id_ong = req.headers.authorization;

        const incident = await connection('incidents')
            .where("id", id)
            .select("ong_id")
            .first();
        
        if(!incident){
            return res.status(401).json({error: "Incident not found, try again!"});
        }

        if(id_ong !== incident.ong_id){
            return res.status(401).json({ error: "Operation not permited" });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    },
    async deleteAll(req, res){
        await connection('incidents').delete();

        return res.status(204).send();
    }
}