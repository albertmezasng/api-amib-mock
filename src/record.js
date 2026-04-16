import { Router } from 'express';
import {getConnection} from "./database.js";

const router = Router();

const DEFAULT_STATUS = {
    id: 1,
    name: 'Pendiente',
    abbreviation: 'PENDING',
};

const DEFAULT_REQUEST_STATUS = {
    id: 1,
    description: 'Creacion de expedientes',
};

const RECORD_STATUS_CATALOG = {
    1: { name: 'Pendiente', abbreviation: 'PENDING' },
    3: { name: 'Carga de documentos', abbreviation: 'UPLOAD_DOCS' },
    4: { name: 'Enviada', abbreviation: 'SENT' },
    9: { name: 'Carga de archivos completa', abbreviation: 'FILES_COMPLETED' },
    10: { name: 'Carga de formularios', abbreviation: 'UPLOAD_FORMS' },
};

const REQUEST_STATUS_CATALOG = {
    1: 'Creacion de expedientes',
    2: 'Carga de documentos',
    3: 'Asignacion de fecha',
    5: 'Esperando pago',
    6: 'Enviada',
    8: 'Carga de formularios',
};

const DEFAULT_RECORD_DOCUMENTS = [
    {
        id: 1,
        name: 'Carta de Intencion de Apoderamiento',
        type: 'pdf',
        required: true,
        numViews: 1,
        header: 'Carta de Intencion de Apoderamiento',
        advise: 'PDF (max. 5MB)',
        enable: true,
    },
    {
        id: 2,
        name: 'Manifestacion bajo protesta de decir verdad',
        type: 'pdf',
        required: true,
        numViews: 1,
        header: 'Manifestacion bajo protesta de decir verdad',
        advise: 'PDF (max. 5MB)',
        enable: true,
    },
];

const DEFAULT_VINC_ALTA_FORM = {
    formTemplateId: 1,
    formTemplateCode: 'VINC_ALTA',
    formTemplateName: 'Vinculacion / Alta',
    description: 'Formulario dinamico para alta de personal',
    form: {
        title: 'Vinculacion / Alta',
        fields: [
            {
                name: 'matricula',
                type: 'number',
                label: 'Matricula',
                readOnly: true,
                validators: ['required'],
                placeholder: 'Ingrese 7 digitos',
            },
            {
                name: 'nombre',
                type: 'text',
                label: 'Nombre',
                readOnly: true,
            },
            {
                name: 'rfc',
                type: 'text',
                label: 'R.F.C.',
                readOnly: true,
            },
            {
                name: 'lineaNegocio',
                type: 'text',
                label: 'Linea de negocio',
                readOnly: true,
            },
            {
                name: 'fechaInicioLabores',
                type: 'date',
                label: 'Fecha de inicio de labores',
                format: 'DD/MM/YYYY',
                validators: ['required'],
            },
            {
                name: 'puestoActual',
                type: 'text',
                label: 'Puesto actual',
                maxLength: 70,
                validators: ['required'],
            },
        ],
    },
    documents: [],
    enable: true,
};

const getRecordServices = (db) => {
    db.data.recordServices ||= [];
    return db.data.recordServices;
};

const getRecordDocumentTemplates = (service) => {
    if (Number(service.serviceId) === 1) {
        return DEFAULT_RECORD_DOCUMENTS;
    }

    return [
        {
            id: 1,
            name: 'Documento de Identificacion',
            type: 'pdf',
            required: true,
            numViews: 1,
            header: 'Documento de Identificacion',
            advise: 'PDF (max. 5MB)',
            enable: true,
        },
        {
            id: 2,
            name: 'Documento de Identificacion 2',
            type: 'pdf',
            required: true,
            numViews: 1,
            header: 'Documento de Identificacion 2',
            advise: 'PDF (max. 5MB)',
            enable: true,
        },
    ];
};

const createRecordDocuments = (service) => {
    const now = new Date().toISOString();
    return getRecordDocumentTemplates(service).map((document, index) => ({
        id: document.id,
        documentId: document.id,
        name: document.name,
        type: document.type,
        required: document.required,
        numViews: document.numViews ?? 1,
        header: document.header ?? document.name,
        advise: document.advise ?? 'PDF (max. 5MB)',
        enable: document.enable ?? true,
        createDate: now,
        updateDate: now,
        uploaded: false,
        file_key: null,
        fileKey: null,
        record_document_id: null,
        recordDocumentId: null,
        comments: null,
        approved: null,
        orderNumber: index + 1,
    }));
};

const resolveRecordServicesByRecordOrRequestId = (recordServices, value) => {
    const numericValue = Number(value);
    const byRecordId = recordServices.filter((record) => Number(record.id) === numericValue);
    if (byRecordId.length > 0) {
        return byRecordId;
    }

    return recordServices.filter((record) => Number(record.requestId) === numericValue);
};

const buildFormTemplateResponse = (record) => {
    const applicableForms = Number(record.serviceId) === 1
        ? [
            {
                serviceId: record.id,
                ...DEFAULT_VINC_ALTA_FORM,
                documents: [],
            }
        ]
        : [];

    return {
        serviceId: record.id,
        applicantId: Number(record.applicantId),
        applicableForms,
        completed: Array.isArray(record.answers) && record.answers.length > 0,
    };
};

const getNextNumericId = (items = []) => {
    if (items.length === 0) {
        return 1;
    }

    return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
};

const getNextRequestId = (items = []) => {
    if (items.length === 0) {
        return 1;
    }

    return Math.max(...items.map((item) => Number(item.requestId) || 0)) + 1;
};

const normalizeCreateRecordPayload = (body = {}) => {
    if (Array.isArray(body.services) && body.services.length > 0) {
        return {
            applicantManagement: Boolean(body.applicantManagement),
            services: body.services,
        };
    }

    if (body && typeof body === 'object' && body.serviceId) {
        return {
            applicantManagement: Boolean(body.applicantManagement),
            services: [body],
        };
    }

    return {
        applicantManagement: Boolean(body.applicantManagement),
        services: [],
    };
};

const buildRecordServiceSummary = (record) => ({
    id: record.id,
    requestId: record.requestId,
    requestTypeId: record.requestTypeId,
    serviceId: record.serviceId,
    typeId: record.typeId,
    typeName: record.typeName,
    typeDescription: record.typeDescription,
    subtypeId: record.subtypeId,
    subtypeName: record.subtypeName,
    subtypeDescription: record.subtypeDescription,
    applicantId: String(record.applicantId),
    applicantName: record.applicantName,
    applicantLastName: record.applicantLastName,
    applicantMothersName: record.applicantMothersName,
    statusId: record.statusId,
    statusName: record.statusName,
    statusAbbreviation: record.statusAbbreviation,
    createDate: record.createDate,
    updateDate: record.updateDate,
    recordServiceTypeId: record.recordServiceTypeId,
    documentVersionId: record.documentVersionId,
    businessLineTypeName: record.businessLineTypeName,
});

const buildRecordServiceDetail = (record) => ({
    serviceId: record.serviceId,
    requestId: record.requestId,
    requestStatusId: record.requestStatusId,
    requestStatusDescription: record.requestStatusDescription,
    serviceName: record.typeName,
    subserviceName: record.subtypeName,
    applicantId: Number(record.applicantId),
    applicantName: [record.applicantName, record.applicantLastName, record.applicantMothersName]
        .filter(Boolean)
        .join(' '),
    birthdate: record.birthdate,
    birthplace: record.birthplace,
    rfc: record.rfc,
    curp: record.curp,
    cellphone: record.cellphone,
    phone: record.phone,
    officePhone: record.officePhone,
    extension: record.extension,
    emailBadge: record.emailBadge,
    emailCertificate: record.emailCertificate,
    modalityId: record.modalityId,
    modalityDescription: record.modalityDescription,
    institutionTypeId: record.institutionTypeId,
    institutionTypeName: record.institutionTypeName,
    institutionName: record.institutionName,
    businessLineTypeId: record.businessLineTypeId,
    businessLineTypeName: record.businessLineTypeName,
    businessLineName: record.businessLineName,
    evaluationMethodId: record.evaluationMethodId,
    evaluationMethodName: record.evaluationMethodName,
    figureId: record.figureId,
    figureName: record.figureName,
    marketId: record.marketId,
    marketName: record.marketName,
    applicantManagement: record.applicantManagement,
    statusId: record.statusId,
    statusName: record.statusName,
    statusAbbreviation: record.statusAbbreviation,
    createDate: record.createDate,
    updateDate: record.updateDate,
});

const buildRequestServiceDetail = (record) => ({
    serviceId: record.id,
    requestId: record.requestId,
    requestStatusId: record.requestStatusId,
    requestStatusDescription: record.requestStatusDescription,
    serviceName: record.typeName,
    subserviceName: record.subtypeName,
    applicantId: Number(record.applicantId),
    applicantName: [record.applicantName, record.applicantLastName, record.applicantMothersName]
        .filter(Boolean)
        .join(' '),
    birthdate: record.birthdate,
    birthplace: record.birthplace,
    rfc: record.rfc,
    curp: record.curp,
    cellphone: record.cellphone,
    phone: record.phone,
    officePhone: record.officePhone,
    extension: record.extension,
    emailBadge: record.emailBadge,
    emergencyPhone: record.emergencyPhone ?? '',
    stateBirth: record.stateBirth ?? '',
    maritalStatus: record.maritalStatus ?? '',
    nationality: record.nationality ?? '',
    educationLevel: record.educationLevel ?? '',
    gender: record.gender ?? '',
    userId: Number(record.updatedBy ?? record.applicantId ?? 0),
    address: record.address ?? '',
    marketId: record.marketId,
    market: record.marketName,
    figureId: record.figureId,
    figure: record.figureName,
    evaluationMethodId: record.evaluationMethodId,
    evaluationMethod: record.evaluationMethodName,
    documents: (record.documents ?? []).map((document) => ({
        ...document,
        fileKey: document.fileKey ?? document.file_key ?? null,
        recordDocumentId: document.recordDocumentId ?? document.record_document_id ?? null,
    })),
    statusDescription: record.statusName,
    statusId: record.statusId,
    applicantManagement: record.applicantManagement,
    businessLineDescription: record.businessLineName || record.businessLineTypeName,
    comments: record.comments ?? '',
    requestBill: Boolean(record.requestBill),
    billProcessed: Boolean(record.billProcessed),
    feeCategoryId: record.feeCategoryId ?? null,
    serviceTypeId: record.typeId,
    serviceSubtypeId: record.subtypeId,
    answers: record.answers ?? [],
    event: record.event ?? null,
});

const normalizeRecordServiceIds = (body = {}) => {
    if (Array.isArray(body.recordServicesIds)) {
        return body.recordServicesIds.map((id) => Number(id)).filter(Boolean);
    }

    if (Array.isArray(body.recordServiceIds)) {
        return body.recordServiceIds.map((id) => Number(id)).filter(Boolean);
    }

    if (body.recordServiceId !== undefined) {
        return [Number(body.recordServiceId)].filter(Boolean);
    }

    if (body.id !== undefined) {
        return [Number(body.id)].filter(Boolean);
    }

    return [];
};

const createRecordServiceEntity = ({ service, id, requestId, applicantManagement }) => {
    const now = new Date().toISOString();
    const applicantId = Number(service.applicantId ?? id);

    return {
        id,
        requestId,
        requestTypeId: 1,
        requestStatusId: DEFAULT_REQUEST_STATUS.id,
        requestStatusDescription: DEFAULT_REQUEST_STATUS.description,
        serviceId: Number(service.serviceId ?? 0),
        typeId: Number(service.typeId ?? service.serviceId ?? 0),
        typeName: service.typeName ?? `Servicio ${service.serviceId ?? id}`,
        typeDescription: service.typeDescription ?? `Servicio ${service.serviceId ?? id}`,
        subtypeId: Number(service.subtypeId ?? service.serviceId ?? 0),
        subtypeName: service.subtypeName ?? `Subservicio ${service.serviceId ?? id}`,
        subtypeDescription: service.subtypeDescription ?? `Subservicio ${service.serviceId ?? id}`,
        applicantId,
        applicantName: service.applicantName ?? `Sustentante ${applicantId}`,
        applicantLastName: service.applicantLastName ?? '',
        applicantMothersName: service.applicantMothersName ?? '',
        statusId: Number(service.statusId ?? DEFAULT_STATUS.id),
        statusName: service.statusName ?? DEFAULT_STATUS.name,
        statusAbbreviation: service.statusAbbreviation ?? DEFAULT_STATUS.abbreviation,
        createDate: now,
        updateDate: now,
        recordServiceTypeId: Number(service.recordServiceTypeId ?? 1),
        documentVersionId: Number(service.documentVersionId ?? 1),
        businessLineTypeName: service.businessLineTypeName ?? `Linea de negocio ${service.businessLineTypeId ?? ''}`.trim(),
        evaluationMethodId: Number(service.evaluationMethodId ?? 0),
        evaluationMethodName: service.evaluationMethodName ?? `Metodo ${service.evaluationMethodId ?? 0}`,
        evaluationMethodDescription: service.evaluationMethodDescription ?? '',
        figureId: Number(service.figureId ?? 0),
        figureName: service.figureName ?? `Figura ${service.figureId ?? 0}`,
        marketId: Number(service.marketId ?? 0),
        marketName: service.marketName ?? `Mercado ${service.marketId ?? 0}`,
        institutionTypeId: Number(service.institutionTypeId ?? 0),
        institutionTypeName: service.institutionTypeName ?? `Institucion ${service.institutionTypeId ?? 0}`,
        institutionName: service.institutionName ?? '',
        businessLineTypeId: Number(service.businessLineTypeId ?? 0),
        businessLineName: service.businessLineName ?? '',
        modalityId: Number(service.modalityId ?? 0),
        modalityDescription: service.modalityDescription ?? '',
        birthdate: service.birthdate ?? null,
        birthplace: service.birthplace ?? '',
        rfc: service.rfc ?? '',
        curp: service.curp ?? '',
        cellphone: service.cellphone ?? '',
        phone: service.phone ?? '',
        officePhone: service.officePhone ?? '',
        extension: service.extension ?? '',
        emailBadge: service.emailBadge ?? '',
        emailCertificate: service.emailCertificate ?? '',
        applicantManagement,
        documents: createRecordDocuments(service),
        answers: [],
        event: null,
        requestBill: false,
        billProcessed: false,
        payload: service,
    };
};

const filterRecordServices = (records, query) => {
    const numericFilters = [
        ['statusId', 'statusId'],
        ['serviceId', 'serviceId'],
        ['typeId', 'typeId'],
        ['applicantId', 'applicantId'],
        ['requestId', 'requestId'],
        ['businessLineTypeId', 'businessLineTypeId'],
        ['evaluationMethodId', 'evaluationMethodId'],
    ];

    return records.filter((record) => {
        const matchesNumericFilters = numericFilters.every(([queryKey, recordKey]) => {
            if (query[queryKey] === undefined) {
                return true;
            }

            return Number(record[recordKey]) === Number(query[queryKey]);
        });

        if (!matchesNumericFilters) {
            return false;
        }

        if (query.name) {
            const fullName = [
                record.applicantName,
                record.applicantLastName,
                record.applicantMothersName,
                record.typeName,
                record.subtypeName,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            if (!fullName.includes(String(query.name).toLowerCase())) {
                return false;
            }
        }

        return true;
    });
};

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

router.get('/relationship-validate/:applicantId', async (req, res) => {
    const { applicantId } = req.params;

    if (applicantId === '2500010') {
        return res.status(409).json({
            "category": "E-409",
            "code": "IAM_00001",
            "label": "App error",
            "message": "El sustentante esta vinculado a otra institucion. Debe solicitar su baja en dicha institucion y posteriormente solicitar nuevamente el servicio.",
            "requestId": "e55b69b3-1743-4610-8f14-b26722685e1d"
        });
    }

    if (applicantId === '2600001' || applicantId === '2500001' || applicantId === '2500014') {
        return res.status(200).json({
            "applicantData": {
                "name": "Mario",
                "lastName": "Meza",
                "motherName": "Test",
                "applicantId": Number(applicantId),
                "rfc": "MEMA900101ABC"
            },
        });
    }

    return res.status(404).json({
        "category": "E-404",
        "code": "IAM_00001",
        "label": "App error",
        "message": "El numero de matricula es incorrecto.",
        "requestId": "e55b69b3-1743-4610-8f14-b26722685e1d"
    });
});

router.get('/record-service', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const filteredRecords = filterRecordServices(recordServices, req.query);
    const start = (page - 1) * limit;
    const paginatedData = filteredRecords
        .slice(start, start + limit)
        .map(buildRecordServiceSummary);

    return res.status(200).json({
        statusCode: 200,
        data: {
            data: paginatedData,
            total: filteredRecords.length,
            page,
            lastPage: Math.max(Math.ceil(filteredRecords.length / limit), 1),
        }
    });
})

router.post('/record-service', async (req, res) => {
    try {
        const db = getConnection();
        const recordServices = getRecordServices(db);
        const normalizedPayload = normalizeCreateRecordPayload(req.body);

        if (normalizedPayload.services.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'services is required'
            });
        }

        const requestId = getNextRequestId(recordServices);
        let nextId = getNextNumericId(recordServices);

        const createdRecords = normalizedPayload.services.map((service) => {
            const record = createRecordServiceEntity({
                service,
                id: nextId,
                requestId,
                applicantManagement: normalizedPayload.applicantManagement,
            });
            nextId += 1;
            return record;
        });

        db.data.recordServices.push(...createdRecords);
        await db.write();

        return res.status(201).json({
            statusCode: 201,
            data: {
                request: {
                    id: requestId,
                    user_id: String(createdRecords[0].applicantId),
                    request_type_id: 1,
                    createDate: createdRecords[0].createDate,
                },
                services: createdRecords.map(buildRecordServiceSummary),
            }
        });
    } catch(error) {
        return res.status(500).json(error);
    }
})

router.patch('/record-service', async (req, res) => {
    try {
        const db = getConnection();
        const recordServices = getRecordServices(db);
        const recordIds = normalizeRecordServiceIds(req.body);
        const statusId = Number(req.body?.statusId);

        if (!statusId || recordIds.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'statusId and recordServicesIds are required',
            });
        }

        const statusMetadata = RECORD_STATUS_CATALOG[statusId] || {
            name: `Status ${statusId}`,
            abbreviation: `STATUS_${statusId}`,
        };
        const revisionDate = req.body?.revisionDate ?? null;
        const comments = req.body?.comments ?? '';
        const updatedAt = new Date().toISOString();

        const updatedRecords = recordServices
            .filter((record) => recordIds.includes(Number(record.id)))
            .map((record) => {
                record.statusId = statusId;
                record.statusName = statusMetadata.name;
                record.statusAbbreviation = statusMetadata.abbreviation;
                record.updateDate = updatedAt;
                record.revisionDate = revisionDate;
                record.comments = comments;
                record.updatedBy = req.body?.userId ?? null;
                return record;
            });

        if (updatedRecords.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'record services not found',
            });
        }

        await db.write();

        return res.status(201).json({
            statusCode: 201,
            data: updatedRecords.map(buildRecordServiceSummary),
        });
    } catch(error) {
        return res.status(500).json(error);
    }
})


router.put('/record-service/:id', async (req, res) => {
    return res.status(201).json({
        statusCode: 201,
        data: {}
    })
})

router.put('/request/:requestId', async (req, res) => {
    try {
        const db = getConnection();
        const recordServices = getRecordServices(db);
        const requestId = Number(req.params.requestId);
        const requestStatusId = Number(req.body?.requestStatusId ?? req.body?.requestTypeId);

        if (!requestStatusId) {
            return res.status(400).json({
                statusCode: 400,
                message: 'requestStatusId is required',
            });
        }

        const requestStatusDescription = REQUEST_STATUS_CATALOG[requestStatusId] || `Request status ${requestStatusId}`;
        const updatedAt = new Date().toISOString();
        const updatedRecords = recordServices
            .filter((record) => Number(record.requestId) === requestId)
            .map((record) => {
                record.requestStatusId = requestStatusId;
                record.requestStatusDescription = requestStatusDescription;
                record.updateDate = updatedAt;
                return record;
            });

        if (updatedRecords.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'request not found',
            });
        }

        await db.write();

        return res.status(201).json({
            statusCode: 201,
            data: {
                requestId,
                requestStatusId,
                requestStatusDescription,
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.get('/request/:requestId', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const requestId = Number(req.params.requestId);
    const requestRecords = recordServices
        .filter((record) => Number(record.requestId) === requestId)
        .map(buildRequestServiceDetail);

    if (requestRecords.length === 0) {
        return res.status(404).json({ statusCode: 404 });
    }

    return res.status(200).json({
        statusCode: 200,
        data: requestRecords,
    });
})

router.get('/record-service/document/:recordServiceId', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const record = recordServices.find((item) => Number(item.id) === Number(req.params.recordServiceId));

    if (!record) {
        return res.status(404).json({ statusCode: 404 });
    }

    return res.status(200).json({
        statusCode: 200,
        data: record.documents ?? [],
    });
})

router.get('/record-service/:recordId', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const record = recordServices.find((item) => item.id === Number(req.params.recordId));

    if (!record) {
        return res.status(404).json({ statusCode: 404 });
    }

    return res.status(200).json({
        statusCode: 200,
        data: buildRecordServiceDetail(record),
    });
})

router.get('/record-service/:recordId/document/:documentId', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const record = recordServices.find((item) => Number(item.id) === Number(req.params.recordId));
    const document = record?.documents?.find((item) =>
        Number(item.record_document_id ?? item.id) === Number(req.params.documentId)
    );

    return res.status(200).json({
        statusCode: 200,
        data: {
            signedUrl: document?.file_key
                ? `http://localhost:3005/s3-mock/file/${document.file_key}`
                : 'http://localhost:3005/s3-mock/file/not-found.pdf',
            fileKey: document?.file_key ?? null
        }
    });
});

router.post('/record-service/:recordId/document', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const record = recordServices.find((item) => Number(item.id) === Number(req.params.recordId));

    if (!record) {
        return res.status(404).json({ statusCode: 404 });
    }

    const documentId = Number(req.body?.documentId) || Math.floor(Math.random() * 1000);
    const fileId = req.body?.filePath || `doc-${req.params.recordId}-${documentId}-${Date.now()}.pdf`;
    const document = record.documents?.find((item) => Number(item.id) === documentId || Number(item.documentId) === documentId);
    const recordDocumentId = Date.now();

    if (document) {
        document.record_document_id = recordDocumentId;
        document.recordDocumentId = recordDocumentId;
        document.pending_file_key = fileId;
        document.updateDate = new Date().toISOString();
    }

    await db.write();

    return res.status(201).json({
        statusCode: 201,
        data: {
            signedUrl: `http://localhost:3005/s3-mock/upload/${fileId}`,
            recordDocument: {
                id: recordDocumentId
            }
        }
    });
});

router.patch('/record-service/:recordId/document/:documentId/confirm', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const record = recordServices.find((item) => Number(item.id) === Number(req.params.recordId));
    const document = record?.documents?.find((item) => Number(item.record_document_id) === Number(req.params.documentId));

    if (!record || !document) {
        return res.status(404).json({ statusCode: 404 });
    }

    document.uploaded = true;
    document.file_key = document.pending_file_key ?? req.body?.filePath ?? null;
    document.fileKey = document.file_key;
    document.updateDate = new Date().toISOString();
    delete document.pending_file_key;
    await db.write();

    return res.status(200).json({
        statusCode: 200,
        data: {
            success: true
        }
    });
});

router.patch('/record-service/:documentId/document/:recordId/confirm', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const record = recordServices.find((item) => Number(item.id) === Number(req.params.recordId));
    const document = record?.documents?.find((item) => Number(item.record_document_id) === Number(req.params.documentId));

    if (!record || !document) {
        return res.status(404).json({ statusCode: 404 });
    }

    document.uploaded = true;
    document.file_key = document.pending_file_key ?? req.body?.filePath ?? null;
    document.fileKey = document.file_key;
    document.updateDate = new Date().toISOString();
    delete document.pending_file_key;
    await db.write();

    return res.status(200).json({
        statusCode: 200,
        data: {
            success: true
        }
    });
});

router.get('/form-templates/by-record-service/:recordServiceId', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const resolvedRecords = resolveRecordServicesByRecordOrRequestId(recordServices, req.params.recordServiceId);

    return res.status(200).json({
        statusCode: 200,
        data: resolvedRecords.map(buildFormTemplateResponse)
    });
});

router.post('/form-answers', async (req, res) => {
    const db = getConnection();
    const recordServices = getRecordServices(db);
    const recordServiceId = Number(req.body?.recordServiceId || req.body?.serviceId);
    const record = recordServices.find((item) => Number(item.id) === recordServiceId);
    const now = new Date().toISOString();
    const savedAnswer = {
        "id": 1,
        "recordServiceId": recordServiceId || 179,
        "serviceId": req.body?.serviceId || recordServiceId || 179,
        "formTemplateId": req.body?.formTemplateId || 1,
        "formTemplateCode": req.body?.formTemplateCode || "CERT_EXT",
        "formTemplateName": req.body?.formTemplateName || "Certificacion Extranjera",
        "description": req.body?.description || "Formulario para certificaciones extranjeras",
        "form": req.body?.form || {
            "title": "Certificacion Extranjera",
            "fields": [
                {
                    "name": "tieneCertificacionExtranjera",
                    "type": "radio",
                    "label": "¿Tienes certificacion extranjera?",
                    "value": "si"
                }
            ]
        },
        "documents": req.body?.documents || [],
        "enable": req.body?.enable ?? true,
        "createDate": now,
        "updateDate": now,
        "deleteDate": null,
        "approved": null,
        "comments": null
    };

    if (record) {
        const fieldAnswers = Array.isArray(savedAnswer.form?.fields)
            ? savedAnswer.form.fields.map((field, index) => ({
                questionCode: field.code || field.name || `Q${index + 1}`,
                question: field.label || field.question || field.name || `Pregunta ${index + 1}`,
                answerCode: field.answerCode || field.name || `A${index + 1}`,
                answer: field.value ?? '',
                figureId: record.figureId,
                figure: record.figureName,
                formDocumentId: savedAnswer.formTemplateId,
                fileKey: null,
                uploaded: true,
            }))
            : [];
        record.answers = fieldAnswers;
        record.formAnswer = savedAnswer;
        record.updateDate = now;
        await db.write();
    }

    return res.status(201).json({
        statusCode: 201,
        data: savedAnswer
    });
});

export default router;
