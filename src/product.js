import { Router } from 'express';
import {getConnection} from "./database.js";

const router = Router();

router.post('/testType', async (req, res) => {
    // console.log(req.body);
    try {
        const db = getConnection();
        const data = db.data;
        const testType = data.typeExam;
        const body = {
            id: testType.length + 1,
            ...req.body
        };

        console.log(body);
        db.data.typeExam.push(body);
        await db.write();

        // (await db).data.institutions.push({id: 1, name: 'gdgdgd', institutionTypeId: 1});
        res.status(201).json({ statusCode: 201, data: body });
    } catch(error) {
        return res.status(500).json(error);
    }
    
});

router.get('/testType', async (req, res) => {
    const db = getConnection();
    const data = db.data;
    const testType = data.typeExam;
    
    res.json({ statusCode: 200, data: testType});
});

router.get('/testType/:id', (req, res) => {
    const db = getConnection();
    const data = db.data;
    const testType = data.typeExam.find(test => test.id === parseInt(req.params.id, 10));
    // console.log(rule);
    if (testType !== undefined) {
        res.status(200).json({statusCode: 200, data: testType});
    } else {
        res.status(404).json({statusCode: 404});
    }
    
});

router.put('/testType/:id', async (req, res) => {
    const db = getConnection();
    const data = db.data;
    const testType = data.typeExam.find(test => test.id === parseInt(req.params.id, 10));
    // console.log(rule);
    if (testType !== undefined) {
        testType.name = req.body.name;
        testType.enable = req.body.enable;
        db.data.typeExam.map(test => test.id === req.params.id ? testType: test);
        await db.write();

        res.status(200).json({statusCode: 200, data: testType});
    } else {
        res.status(404).json({statusCode: 404});
    }
    
});


export default router;
