import { Router } from 'express';
import {getConnection} from "./database.js";

const router = Router();

router.post('/rule', async (req, res) => {
    // console.log(req.body);
    try {
        const db = getConnection();
        const data = db.data;
        const rules = data.validations;
        const body = {
            id: rules.length + 1,
            ...req.body
        };

        console.log(body);
        db.data.validations.push(body);
        await db.write();

        // (await db).data.institutions.push({id: 1, name: 'gdgdgd', institutionTypeId: 1});
        res.status(201).json({ statusCode: 201, data: body });
    } catch(error) {
        return res.status(500).json(error);
    }
    
});

router.get('/rule', async (req, res) => {
    const db = getConnection();
    const data = db.data;
    const validations = data.validations;
    
    res.json({ statusCode: 200, data: validations});
});

router.get('/rule/:id', (req, res) => {
    const db = getConnection();
    const data = db.data;
    const rule = data.validations.find(rule => rule.id === parseInt(req.params.id, 10));
    // console.log(rule);
    if (rule !== undefined) {
        res.status(200).json({statusCode: 200, data: rule});
    } else {
        res.status(404).json({statusCode: 404});
    }
    
});

router.put('/rule/:id', async (req, res) => {
    const db = getConnection();
    const data = db.data;
    const rule = data.validations.find(rule => rule.id === parseInt(req.params.id, 10));
    // console.log(rule);
    if (rule !== undefined) {
        rule.name = req.body.name;
        rule.description = req.body.description;
        db.data.validations.map(rule1 => rule1.id === req.params.id ? rule: rule1);
        await db.write();

        res.status(200).json({statusCode: 200, data: rule});
    } else {
        res.status(404).json({statusCode: 404});
    }
    
});

router.delete('/rule/:id', async (req, res) => {
    const db = getConnection();
    const data = db.data;
    const rule = data.validations.find(rule => rule.id === parseInt(req.params.id, 10));
    // console.log(rule);
    if (rule !== undefined) {
        const newValidations = db.data.validations.filter(rule => rule.id !== req.params.id);
        db.data.validations = newValidations;
        await db.write();
        res.status(200).json({statusCode: 200, message:'Deleted sucessfully'});
    } else {
        res.status(404).json({statusCode: 404});
    }
});

router.patch('record-institution-business-line/record/{recordId}/update-status',
    async(req, res) => {
        res.status(200).json({statusCode: 200, message:'Deleted sucessfully'});
    }
);

router.get('/record-institution-business-line/record/:recordId/document', 
    async(req, res) => {
        return res.status(200).json({
            statusCode: 200,
            data: [
                {
                  "id": 1,
                  "documentId": 0,
                  "documentName": "INE",
                  "documentType": "pdf",
                  "documentRequired": true,
                  "hasFile": true,
                  "createDate": "2024-12-31 00:00:00",
                  "updateDate": "2024-12-31 00:00:00"
                }
              ]
        })
    }
)

router.get('/record-institution-business-line/record/:recordId/document/:recordDocumentId',
    async(req, res) => {
        res.status(200).json({
            statusCode: 200,
            data: {
                "createDate": "2019-08-24T14:15:22Z",
                "documentId": 0,
                "documentName": "string",
                "documentRequired": true,
                "documentType": "string",
                "fileKey": "string",
                "hasFile": true,
                "id": 0,
                "signedUrl": "string",
                "updateDate": "2019-08-24T14:15:22Z"
              }
        })
    }
)

router.get('/record-status', async(req, res) => {
    return res.status(200).json({
        statusCode: 200,
        data: [
            {
                "id": 4,
                "name": "Enviadas",
                "abbreviation": "string",
                "enable": true,
                "createDate": "2019-08-24T14:15:22Z",
                "updateDate": "2019-08-24T14:15:22Z",
                "deleteDate": "2019-08-24T14:15:22Z"
              },
              {
                "id": 5,
                "name": "Dictamen en proceso",
                "abbreviation": "string",
                "enable": true,
                "createDate": "2019-08-24T14:15:22Z",
                "updateDate": "2019-08-24T14:15:22Z",
                "deleteDate": "2019-08-24T14:15:22Z"
              },
              {
                "id": 6,
                "name": "Solicitudes Rechazadas",
                "abbreviation": "string",
                "enable": true,
                "createDate": "2019-08-24T14:15:22Z",
                "updateDate": "2019-08-24T14:15:22Z",
                "deleteDate": "2019-08-24T14:15:22Z"
              },
              {
                "id": 7,
                "name": "Solicitudes aprobadas",
                "abbreviation": "string",
                "enable": true,
                "createDate": "2019-08-24T14:15:22Z",
                "updateDate": "2019-08-24T14:15:22Z",
                "deleteDate": "2019-08-24T14:15:22Z"
              }
          ]
    });
});

router.get('/record-institution-business-line/record/:recordId/document/:recordDocumentId/rules', async(req, res) => {
    return res.status(200).json({
        statusCode: 200,
        data: [
            {
            "ruleId": 0,
            "ruleName": "string",
            "ruleDescription": "string",
            "approved": true,
            "updateBy": 0,
            "updateDate": "2019-08-24T14:15:22Z"
            }
        ]
    });
})

router.patch('/record-institution-business-line/record/:recordId/document/:recordDocumentId/rules', async(req, res) => {
    return res.status(200).json({
        statusCode: 200,
        data: {
            "rules": [
              {
                "ruleId": 0,
                "ruleName": "string",
                "ruleDescription": "string",
                "approved": true,
                "updateBy": 0,
                "updateDate": "2019-08-24T14:15:22Z"
              }
            ],
            "lastComment": {
              "recordId": 0,
              "recordDocument": 0,
              "comments": "string",
              "createdBy": 0,
              "createDate": "2019-08-24T14:15:22Z"
            }
          }
    })
})

router.post('/event/:id/activate-exam', async (req, res) => {
    console.log(req.body, req.params.id);
    const ids = [33, 37, 38, 39];
    if (!ids.includes(+req.params.id))  {
        res.status(400).json({ statusCode:400, message: 'tooLate' });
    }
    res.status(200).json({statusCode: 200, data: {message:'Activated sucessfully'}});
})



export default router;