import { Router } from 'express';
import {getConnection} from "./database.js";
import { faker } from '@faker-js/faker';

const router = Router();

router.get('/business-line/:id/brokers', (req, res) => {
    console.log(req.params, req.query);
    const rndInt = Math.floor(Math.random() * 50) + 1;
    let data = [];
    for (let i = 0; i <= rndInt; i++) {
        data.push({
            id: i+1,
            puesto: faker.person.jobTitle(),
            name: faker.person.firstName(),
            last_name: faker.person.middleName(),
            mothers_name: faker.person.lastName(),
            email: faker.person.email(),
            institutionId: 1,
            businessLineId: 1,
            brokerType: 'Admin',
            rfc: 'XAXX010101000',
            cellphone: faker.phone.number(),
            officephone: faker.phone.number()
        });
    }
    res.json({ statusCode: 200, data: data});
});

export default router;