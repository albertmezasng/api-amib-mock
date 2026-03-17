import { Router } from 'express';
import {getConnection} from "./database.js";
import { faker } from '@faker-js/faker';

const router = Router();

router.get(`/users/:id/question-request`, async(req, res) => {
    console.log(req.params, req.query);
    const rndInt = Math.floor(Math.random() * 50) + 1;
    let data = [];
    for (let i = 0; i <= rndInt; i++) {
        data.push({
            id: i+1,
            editorName: faker.person.fullName(),
            limitDate: faker.date.future(),
            createDate: faker.date.recent(),
        })
    }
    res.json({ statusCode: 200, data: data});
});

router.get(`/question-request/:id`, async(req, res) => {
    const rndInt = Math.floor(Math.random() * 4) + 1;
    let details = [];
    for (let i = 0; i <= rndInt; i++) {
        details.push({
            learningResultName: faker.lorem.words(2),
            subAreaName: faker.lorem.words(2),
            taxonomyName: faker.lorem.words(2),
            matterName: faker.lorem.words(2),
            numbQuestions: Math.floor(Math.random() * 4) + 1,
        });
    }
    const data = {
        id: parseInt(req.params.id, 10),
        name: faker.person.fullName(),
        limitDate: faker.date.future(),
        createDate: faker.date.recent(),
        details
    };
    res.json({ statusCode: 200, data: data});
});

router.get('/rejection-reason', async(req, res) =>{
    const data = [
        {id: 1, name: 'No podré cumplir la fecha límite indicada', sort: 1, requireComment: false},
        {id: 2, name: 'No podré atender la solicitud por carga de trabajo', sort: 2, requireComment: false},
        {id: 3, name: 'No podré atender la solicitud por motivos personales', sort: 3, requireComment: false},
        {id: 4, name: 'Otro', sort: 100, requireComment: true},
    ];
    res.json({ statusCode: 200, data });
});

router.put('/users/:userId/question-request/:id/reject', async (req, res) => {
    console.log(req.params, req.query);
    res.json({ statusCode: 200, data: { updateDate: faker.date.recent(), } });
});

router.post('/question', async(req, res) => {
    // Assuming the request body contains the necessary question data
    // Process the question creation logic here (not implemented in this mock)
    console.log(req.body, req.params);

    // Return status code 201 (Created) with a success message
    res.status(201).json({
        statusCode: 201,
        data: {
            message: "Question created successfully",
            question: {
                ...req.body,
                id: faker.number.int(),
            }
        }
    });
});

router.get('/users/:userId/question-request-status', async(req, res) => {
    const data = [
        {
            id: 1,
            name: 'sent',
            isDefaultStatus: true,
        },
        {
            id: 2,
            name: 'accepted',
            isDefaultStatus: false,
        },
        {
            id: 3,
            name: 'rejected',
            isDefaultStatus: false,
        },
        {
            id: 4,
            name: 'expired',
            isDefaultStatus: false,
        },
        {
            id: 5,
            name: 'edit',
            isDefaultStatus: false,
        }
    ];
    return res.json({
        statusCode: 200,
        data: data
    });
})

router.get('/question/:id', async(req, res) => {
    const data = {
        question: faker.lorem.words(10),
    }
    return res.json({
        statusCode: 200,
        data
    })
})

router.get('/applicant-exam/:id/case/:caseId', async(req, res) => {
    //{questionId: "222", sort: 1, isPending: true}
    const rndInt = Math.floor(Math.random() * 4) + 1;
    const instructions = faker.lorem.paragraphs(2);
    
    let questionlist = [];
    for (let i = 0; i <= rndInt; i++) {
        questionlist.push({
            questionId: (222+i).toString(),
            sort: i,
            isPending: true
        });
    }
    const caseData = {id: req.params.caseId,
        instructions: instructions,
        questionList: questionlist,
        hasFile: false,};
    return res.json({
        statusCode: 200,
        data: caseData,
    })
})

export default router;