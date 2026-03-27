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

router.get('/figures/authorization', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;

    const cnbvFiguresByGroup = {
        AI: [
            {
                id: 1,
                cnbvName:
                    'Asesor de Estrategias de Inversión / Apoderado para celebrar operaciones de Arbitraje Internacional',
                cnbvId: 14,
                legend:
                    'Apoderado para celebrar operaciones, promover y asesorar a través de intermediarios financieros.',
                isVigent: true,
            },
            {
                id: 2,
                cnbvName: 'Asesor de Estrategias de Inversión',
                cnbvId: 3,
                legend: 'Serie 210',
                isVigent: false,
            },
        ],
        PFI: [
            {
                id: 3,
                cnbvName: 'Promotor de Fondos de Inversión',
                cnbvId: 5,
                legend: 'Serie 100',
                isVigent: true,
            },
        ],
        PV: [
            {
                id: 4,
                cnbvName: 'Promotor de Valores en Mercado Primario',
                cnbvId: 8,
                legend: 'Serie 200 — Mercado Primario',
                isVigent: true,
            },
            {
                id: 5,
                cnbvName: 'Promotor de Valores en Mercado Secundario',
                cnbvId: 9,
                legend: 'Serie 200 — Mercado Secundario',
                isVigent: false,
            },
        ],
    };

    const fixedFigures = [
        { id: 1, acronym: 'AI', name: 'Asesor en Estrategias de Inversión (Serie 210)', enable: true, figures: cnbvFiguresByGroup.AI },
        { id: 2, acronym: 'PFI', name: 'Promotor de Fondos de INVERSIÓN (Serie 100)', enable: true, figures: cnbvFiguresByGroup.PFI },
        { id: 3, acronym: 'PV', name: 'Promotor de Valores (Serie 200)', enable: true, figures: cnbvFiguresByGroup.PV },
        { id: 4, acronym: 'EAC', name: 'Ejecutivo de Atención a Clientes (Serie 120)', enable: true, figures: [] },
        { id: 5, acronym: 'OFI', name: 'Operador de Fondos de Inversión', enable: false, figures: [] },
        { id: 6, acronym: 'DG', name: 'Director General de Casa de Bolsa', enable: true, figures: [] },
        { id: 7, acronym: 'OC', name: 'Oficial de Cumplimiento', enable: true, figures: [] },
        { id: 8, acronym: 'RL', name: 'Representante Legal', enable: false, figures: [] },
        { id: 9, acronym: 'RMR', name: 'Representante para Manejo de Recursos', enable: true, figures: [] },
        { id: 10, acronym: 'ACV', name: 'Asesor en Certificación de Valores (Serie 250)', enable: true, figures: [] },
        { id: 11, acronym: 'OD', name: 'Operador de Derivados (Serie 300)', enable: true, figures: [] },
        { id: 12, acronym: 'APF', name: 'Asesor en Planeación Financiera', enable: false, figures: [] },
        { id: 13, acronym: 'CM', name: 'Corredor de Mercado de Capitales', enable: true, figures: [] },
        { id: 14, acronym: 'AGF', name: 'Administrador de Gestión de Fondos', enable: true, figures: [] },
        { id: 15, acronym: 'CE', name: 'Consultor de Estrategias Bursátiles', enable: true, figures: [] },
        { id: 16, acronym: 'AIP', name: 'Asesor de Inversión Patrimonial', enable: false, figures: [] },
        { id: 17, acronym: 'NCV', name: 'Negociador de Carteras de Valores', enable: true, figures: [] },
        { id: 18, acronym: 'EIF', name: 'Especialista en Instrumentos de Financiamiento', enable: true, figures: [] },
        { id: 19, acronym: 'PDE', name: 'Promotor de Derivados y Estructurados (Serie 400)', enable: true, figures: [] },
        { id: 20, acronym: 'GRP', name: 'Gestor de Riesgos de Portafolio', enable: true, figures: [] },
        { id: 21, acronym: 'ASG', name: 'Asesor de Sostenibilidad y Gobierno Corporativo', enable: false, figures: [] },
        { id: 22, acronym: 'CMB', name: 'Corredor de Mercado de Bonos', enable: true, figures: [] },
        { id: 23, acronym: 'TAB', name: 'Técnico en Análisis Bursátil', enable: true, figures: [] },
    ];

    const totalItems = fixedFigures.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    const pageData = fixedFigures.slice(start, start + limit);

    res.json({
        statusCode: 200,
        data: {
            page,
            totalPages,
            totalItems,
            data: pageData,
        },
    });
});

export default router;
