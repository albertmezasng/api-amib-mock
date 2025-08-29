import { Router } from 'express';
import {getConnection} from "./database.js";

const router = Router();

router.post('', async (req, res) => {
    console.log(req.body);
    try {
        const db = getConnection();
        const data = db.data;
        const institutions = data.institutions;
        const body = {
            id: institutions.length + 1,
            ...req.body
        };

        console.log(body);
        db.data.institutions.push(body);
        await db.write();

        // (await db).data.institutions.push({id: 1, name: 'gdgdgd', institutionTypeId: 1});
        res.status(201).json({ statusCode: 201, message: 'Se ha agregado la institucion exitosamente', institution: body });
    } catch(error) {
        return res.status(500).json(error);
    }
    
});

router.get('', (req, res) => {
    const data = getConnection().data;
    const institutions = data.institutions;
    res.json(institutions);
});

router.get('/type', (req, res) => {
    res.json([
        {id:1, name:'Instituciones financieras'},
        {id:2, name:'Universidades'},
        {id:3, name:'Organismos'},
        {id:4, name:'Capcitación'},
    ]);
});

export default router;