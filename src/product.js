import { Router } from 'express';
import {getConnection} from "./database.js";
import { faker } from '@faker-js/faker';


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

router.get('/notary', async (req, res) => {
    /*
    {
    "page" = int,
    "totalPage" = int,
    "totalItems" = int,
    "data" = [
        {
            "id": int
            "name": string,
            "enable": boolean,
            "federativeEntityId": int,
            "federativeEntityName": string,
            "createDate": string,
            "notaryNumber": int,
            "updateDate": string
        }
    ]
}
    */
    const rndInt = Math.floor(Math.random() * 10) + 1;
    let details = [];
    for (let i = 0; i <= rndInt; i++) {
        details.push({
            id: i,
            name: faker.person.fullName(),
            enable: true,
            federativeEntityId: 1,
            federativeEntityName: 'Ciudad de México',
            createDate: "2026-03-06T09:00:00",
            notaryNumber: i,
            updateDate: "2026-03-06T09:00:00"
        });
    }
    const data = {
        page: 1,
        totalPage: 10,
        totalItems: 95,
        data: details
    };
    res.json({ statusCode: 200, data: data});
})

router.post('/notary', async(req,res) => {
    res.status(201).json({
        statusCode: 201, data: res.body
    })
})

router.patch('/notary/:id', async(req,res) => {
    res.status(200).json({
        statusCode: 200, data: res.body
    })
})

export default router;
