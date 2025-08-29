import express from "express";
import {getConnection} from "./database.js";
import { faker } from '@faker-js/faker';

const router = express.Router();


router.post('', async (req, res) => {
    try {
        const db = getConnection();
        const data = db.data;
        const businessLines = data.businessLines;
        const body = {
            id: businessLines.length + 1,
            ...req.body
        };

        console.log(body);
        db.data.businessLines.push(body);
        await db.write();
        res.status(201).json({ statusCode: 201, message: 'Se ha agregado la institucion exitosamente', businessLine: body });
    } catch(error) {
        return res.status(500).json(error);
    }
});

router.get('', (req, res) => {
    const db = getConnection();
    const data = db.data;
    const businessLines = data.businessLines;
    res.status(200).json(businessLines);
});

router.get('/type/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let typeLines = [];
    console.log(id);
    switch(id) {
        case 1:
            typeLines = [
                {id:1,name: 'Casa de bolsa'},
                {id:2,name: 'Banco'},
                {id:3,name: 'Afores'},
                {id:4,name: 'Otros'},
            ];
            break;
        case 2:
            typeLines = [
                {id:5,name: 'Con convenio'},
                {id:6,name: 'Sin convenio'},
                {id:7,name: 'Catedra'}
            ];
            break;
        case 3:
            typeLines = [
                {id:9,name: 'Centralizados'},
                {id:9,name: 'Decentralizados'},
            ];
            break;
        case 4:
            typeLines = [
                {id:10,name: 'Instituciones'},
                {id:11,name: 'Financieras'},
                {id:12,name: 'Universidades'},
                {id:13,name: 'Independientes'},
            ];
            break;
        default:
            typeLines = [];
    }
    res.status(200).json(typeLines);
});

router.get('/:institutionId', (req, res) => {
    const db = getConnection();
    const data = db.data;
    const businessLines = data.businessLines.filter(businessLine => businessLine.institutionId === parseInt(req.params.institutionId, 10));
    res.status(200).json(businessLines);
})

router.get('/:id/brokers', (req, res) => {
    console.log(req.params, req.query);
    const rndInt = Math.floor(Math.random() * 50) + 1;
    let data = [];
    for (let i = 0; i <= rndInt; i++) {
        data.push({
            id: i+1,
            puesto: faker.person.jobTitle(),
            name: faker.person.firstName(),
            lastName: faker.person.middleName(),
            mothersName: faker.person.lastName(),
            email: faker.internet.email(),
            institutionId: 1,
            businessLineId: 1,
            brokerType: 'Admin',
            rfc: 'XAXX010101000',
            cellphone: faker.phone.number(),
            officephone: faker.phone.number()
        })
    }
    res.json({ statusCode: 200, data: data});
});

export default router;