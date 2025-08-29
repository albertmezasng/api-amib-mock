import { Router } from 'express';
import {getConnection} from "./database.js";
const router = Router();

router.get('list', (req, res) => {
    res.json([]);
})

router.post('/role', async (req, res) => {
    
});

router.post('/broker', async (req, res) => {
    console.log(req.body);
    try {
        const db = getConnection();
        const data = db.data;
        const brokers = data.brokers;
        const body = {
            id: brokers.length + 1,
            ...req.body
        };

        console.log(body);
        db.data.brokers.push(body);
        await db.write();
        res.status(201).json({ statusCode: 201, message: 'Se ha agregado exitosamente el broker', broker: body });
    } catch(error) {
        return res.status(500).json(error);
    }
});

router.get('/broker', (req, res) => {
    const db = getConnection();
    const data = db.data;
    const brokers = data.brokers;
    res.status(200).json(brokers);
});

export default router;