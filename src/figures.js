import { Router } from 'express';

const router = Router();

const legendsByGroup = {
    AI: [
        {
            id: 36,
            nameCNBV: 'Asesor de Estrategias de Inversión',
            idCNBV: 14,
            siglas: 'AI',
            authorizationLegend: 'Apoderado para celebrar operaciones, promover y asesorar a través de recomendaciones personalizadas al público inversionista.',
            isCurrent: true,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
        {
            id: 34,
            nameCNBV: 'Asesor de estrategias de inversión/Apoderado para celebrar operaciones de Arbitraje Internacional',
            idCNBV: 6,
            siglas: 'AIJ',
            authorizationLegend: 'Apoderado para celebrar operaciones, promover y asesorar a través de recomendaciones personalizadas al público inversionista.',
            isCurrent: false,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
        {
            id: 30,
            nameCNBV: 'Asesor de Estrategias de Inversión',
            idCNBV: 13,
            siglas: 'AI',
            authorizationLegend: 'Apoderado para operar con acciones de sociedades de inversión a nombre de intermediarios del mercado de valores.',
            isCurrent: false,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
        {
            id: 22,
            nameCNBV: 'Asesor de Estrategias de Inversión',
            idCNBV: 3,
            siglas: 'AI',
            authorizationLegend: 'Serie 210',
            isCurrent: false,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
    ],
    PFI: [
        {
            id: 18,
            nameCNBV: 'Promotor de Fondos de Inversión',
            idCNBV: 5,
            siglas: 'PFI',
            authorizationLegend: 'Serie 100 — Autorización para promoción de fondos de inversión.',
            isCurrent: true,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
    ],
    PV: [
        {
            id: 15,
            nameCNBV: 'Promotor de Valores en Mercado Primario',
            idCNBV: 8,
            siglas: 'PV',
            authorizationLegend: 'Serie 200 — Mercado Primario.',
            isCurrent: true,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
        {
            id: 10,
            nameCNBV: 'Promotor de Valores en Mercado Secundario',
            idCNBV: 9,
            siglas: 'PV',
            authorizationLegend: 'Serie 200 — Mercado Secundario.',
            isCurrent: false,
            createDate: '2026-03-12T18:10:25',
            createBy: 'userID',
            updateDate: '2026-03-12T18:10:25',
            updateBy: 'userID',
        },
    ],
};

const allFigures = [
    { figureId: 1,  sigla: 'AI',  name: 'Asesor en Estrategias de Inversión',             serie: '210', enable: true,  legends: legendsByGroup.AI  },
    { figureId: 2,  sigla: 'PFI', name: 'Promotor de Fondos de Inversión',                 serie: '100', enable: true,  legends: legendsByGroup.PFI },
    { figureId: 3,  sigla: 'PV',  name: 'Promotor de Valores',                             serie: '200', enable: true,  legends: legendsByGroup.PV  },
    { figureId: 4,  sigla: 'EAC', name: 'Ejecutivo de Atención a Clientes',                serie: '120', enable: true,  legends: []                 },
    { figureId: 5,  sigla: 'OFI', name: 'Operador de Fondos de Inversión',                 serie: null,  enable: false, legends: []                 },
    { figureId: 6,  sigla: 'DG',  name: 'Director General de Casa de Bolsa',               serie: null,  enable: true,  legends: []                 },
    { figureId: 7,  sigla: 'OC',  name: 'Oficial de Cumplimiento',                         serie: null,  enable: true,  legends: []                 },
    { figureId: 8,  sigla: 'RL',  name: 'Representante Legal',                             serie: null,  enable: false, legends: []                 },
    { figureId: 9,  sigla: 'RMR', name: 'Representante para Manejo de Recursos',           serie: null,  enable: true,  legends: []                 },
    { figureId: 10, sigla: 'ACV', name: 'Asesor en Certificación de Valores',              serie: '250', enable: true,  legends: []                 },
    { figureId: 11, sigla: 'OD',  name: 'Operador de Derivados',                           serie: '300', enable: true,  legends: []                 },
    { figureId: 12, sigla: 'APF', name: 'Asesor en Planeación Financiera',                 serie: null,  enable: false, legends: []                 },
    { figureId: 13, sigla: 'CM',  name: 'Corredor de Mercado de Capitales',                serie: null,  enable: true,  legends: []                 },
    { figureId: 14, sigla: 'AGF', name: 'Administrador de Gestión de Fondos',              serie: null,  enable: true,  legends: []                 },
    { figureId: 15, sigla: 'CE',  name: 'Consultor de Estrategias Bursátiles',             serie: null,  enable: true,  legends: []                 },
    { figureId: 16, sigla: 'AIP', name: 'Asesor de Inversión Patrimonial',                 serie: null,  enable: false, legends: []                 },
    { figureId: 17, sigla: 'NCV', name: 'Negociador de Carteras de Valores',               serie: null,  enable: true,  legends: []                 },
    { figureId: 18, sigla: 'EIF', name: 'Especialista en Instrumentos de Financiamiento',  serie: null,  enable: true,  legends: []                 },
    { figureId: 19, sigla: 'PDE', name: 'Promotor de Derivados y Estructurados',           serie: '400', enable: true,  legends: []                 },
    { figureId: 20, sigla: 'GRP', name: 'Gestor de Riesgos de Portafolio',                 serie: null,  enable: true,  legends: []                 },
    { figureId: 21, sigla: 'ASG', name: 'Asesor de Sostenibilidad y Gobierno Corporativo', serie: null,  enable: false, legends: []                 },
    { figureId: 22, sigla: 'CMB', name: 'Corredor de Mercado de Bonos',                    serie: null,  enable: true,  legends: []                 },
    { figureId: 23, sigla: 'TAB', name: 'Técnico en Análisis Bursátil',                    serie: null,  enable: true,  legends: []                 },
];

const findLegendContextById = (id) => {
    for (const figure of allFigures) {
        const legend = figure.legends.find((l) => l.id === id);
        if (legend) {
            return { figure, legend };
        }
    }
    return null;
};

router.get('/authorization_figure/:id', (req, res) => {
    const id = Number(req.params.id);
    const context = findLegendContextById(id);

    if (!context) {
        return res.status(404).json({ message: 'Leyenda no encontrada' });
    }

    return res.status(200).json({ ...context.legend });
});

router.get('/authorization_figure', (req, res) => {
    res.json({
        statusCode: 200,
        data: allFigures,
    });
});

router.patch('/authorization_figure/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nameCNBV, idCNBV, siglas, authorizationLegend, isCurrent } = req.body;

    const context = findLegendContextById(id);
    if (!context) {
        return res.status(404).json({ message: 'Leyenda no encontrada' });
    }

    const { figure: parentFigure, legend: found } = context;

    // Validación: si se envían campos de texto deben estar completos
    const hasTextFields =
        nameCNBV !== undefined ||
        idCNBV !== undefined ||
        siglas !== undefined ||
        authorizationLegend !== undefined;
    if (hasTextFields && (!nameCNBV || !idCNBV || !siglas || !authorizationLegend)) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Regla de negocio para el toggle de vigencia
    if (isCurrent !== undefined) {
        const isParentActive = !!parentFigure.enable;

        if (!isCurrent && isParentActive) {
            // Verificar que no sea el único vigente
            const otherActive = parentFigure.legends.filter((l) => l.id !== id && l.isCurrent);
            if (otherActive.length === 0) {
                return res.status(409).json({
                    message: 'No es posible quitar la vigencia: debe existir al menos una leyenda vigente.',
                });
            }
        }

        if (isCurrent) {
            // Desactivar todos los demás del mismo papá
            parentFigure.legends.forEach((l) => {
                if (l.id !== id) {
                    l.isCurrent = false;
                    l.updateDate = new Date().toISOString();
                }
            });
        }
    }

    // Aplicar cambios (campos de texto opcionales)
    if (nameCNBV !== undefined) found.nameCNBV = nameCNBV;
    if (idCNBV !== undefined) found.idCNBV = Number(idCNBV);
    if (siglas !== undefined) found.siglas = siglas;
    if (authorizationLegend !== undefined) found.authorizationLegend = authorizationLegend;
    if (isCurrent !== undefined) found.isCurrent = !!isCurrent;
    found.updateDate = new Date().toISOString();

    res.status(200).json({ ...found });
});

router.post('/authorization_figure', (req, res) => {
    const { figureId, nameCNBV, idCNBV, siglas, authorizationLegend, isCurrent } = req.body;

    if (!figureId || !nameCNBV || !idCNBV || !siglas || !authorizationLegend) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const parentFigure = allFigures.find((f) => f.figureId === Number(figureId));
    if (!parentFigure) {
        return res.status(404).json({ message: 'Figura padre no encontrada' });
    }

    const now = new Date().toISOString();
    const newLegend = {
        id: Date.now(),
        nameCNBV,
        idCNBV: Number(idCNBV),
        siglas,
        authorizationLegend,
        isCurrent: !!isCurrent,
        createDate: now,
        createBy: 'userID',
        updateDate: now,
        updateBy: 'userID',
    };

    // Si la nueva leyenda queda vigente, desactivar las demás del mismo papá
    if (newLegend.isCurrent) {
        parentFigure.legends.forEach((l) => {
            l.isCurrent = false;
            l.updateDate = now;
        });
    }

    parentFigure.legends.push(newLegend);

    res.status(201).json(newLegend);
});

export default router;