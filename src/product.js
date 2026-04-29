import { Router } from "express";
import { getConnection } from "./database.js";
import { faker, tr } from "@faker-js/faker";

const router = Router();

const entidades = [
  {
    id: 2,
    name: "Baja California",
    cnbvId: 11,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 3,
    name: "Baja California Sur",
    cnbvId: 12,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 4,
    name: "Campeche",
    cnbvId: 13,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 5,
    name: "Coahuila de Zaragoza",
    cnbvId: 14,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 6,
    name: "Colima",
    cnbvId: 15,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 7,
    name: "Chiapas",
    cnbvId: 16,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 8,
    name: "Chihuahua",
    cnbvId: 17,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 9,
    name: "Distrito Federal/CDMX",
    cnbvId: 18,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 10,
    name: "Durango",
    cnbvId: 19,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 11,
    name: "Guerrero",
    cnbvId: 20,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 12,
    name: "Guanajuato",
    cnbvId: 21,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 13,
    name: "Hidalgo",
    cnbvId: 22,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 14,
    name: "Jalisco",
    cnbvId: 23,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 15,
    name: "Estado de México",
    cnbvId: 24,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 16,
    name: "Michoacan",
    cnbvId: 25,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 17,
    name: "Morelos",
    cnbvId: 26,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 18,
    name: "Nayarit",
    cnbvId: 27,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 19,
    name: "Nuevo León",
    cnbvId: 28,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 20,
    name: "Oaxaca",
    cnbvId: 29,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 21,
    name: "Puebla",
    cnbvId: 30,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 22,
    name: "Querétaro",
    cnbvId: 31,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 23,
    name: "Quintana Roo",
    cnbvId: 32,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 24,
    name: "Sinaloa",
    cnbvId: 33,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 25,
    name: "San Luis Potosí",
    cnbvId: 34,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 26,
    name: "Sonora",
    cnbvId: 35,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 27,
    name: "Tabasco",
    cnbvId: 36,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 28,
    name: "Tamaulipas",
    cnbvId: 37,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 29,
    name: "Tlaxcala",
    cnbvId: 38,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 30,
    name: "Veracruz",
    cnbvId: 39,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 31,
    name: "Yucatán",
    cnbvId: 40,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 32,
    name: "Zacatecas",
    cnbvId: 41,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: null,
    deleteDate: null
  },
  {
    id: 33,
    name: "EntidadMel edit",
    cnbvId: 15,
    enable: false,
    createDate: "2025-06-24T04:49:15.272Z",
    updateDate: "2025-11-05T03:42:54.730Z",
    deleteDate: null
  },
  {
    id: 1,
    name: "Aguascalientes",
    cnbvId: 10,
    enable: true,
    createDate: "2025-01-18T09:53:44.461Z",
    updateDate: "2025-11-11T21:36:34.628Z",
    deleteDate: null
  }
]



router.post("/testType", async (req, res) => {
  // console.log(req.body);
  try {
    const db = getConnection();
    const data = db.data;
    const testType = data.typeExam;
    const body = {
      id: testType.length + 1,
      ...req.body,
    };

    console.log(body);
    db.data.typeExam.push(body);
    await db.write();

    // (await db).data.institutions.push({id: 1, name: 'gdgdgd', institutionTypeId: 1});
    res.status(201).json({ statusCode: 201, data: body });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/testType", async (req, res) => {
  const db = getConnection();
  const data = db.data;
  const testType = data.typeExam;

  res.json({ statusCode: 200, data: testType });
});

router.get("/testType/:id", (req, res) => {
  const db = getConnection();
  const data = db.data;
  const testType = data.typeExam.find(
    (test) => test.id === parseInt(req.params.id, 10),
  );
  // console.log(rule);
  if (testType !== undefined) {
    res.status(200).json({ statusCode: 200, data: testType });
  } else {
    res.status(404).json({ statusCode: 404 });
  }
});

router.put("/testType/:id", async (req, res) => {
  const db = getConnection();
  const data = db.data;
  const testType = data.typeExam.find(
    (test) => test.id === parseInt(req.params.id, 10),
  );
  // console.log(rule);
  if (testType !== undefined) {
    testType.name = req.body.name;
    testType.enable = req.body.enable;
    db.data.typeExam.map((test) =>
      test.id === req.params.id ? testType : test,
    );
    await db.write();

    res.status(200).json({ statusCode: 200, data: testType });
  } else {
    res.status(404).json({ statusCode: 404 });
  }
});

router.get("/notary", async (req, res) => {
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
      federativeEntityName: "Ciudad de México",
      createDate: "2026-03-06T09:00:00",
      notaryNumber: i,
      updateDate: "2026-03-06T09:00:00",
    });
  }
  const data = {
    page: 1,
    totalPage: 10,
    totalItems: 95,
    data: details,
  };
  res.json({ statusCode: 200, data: data });
});

router.get("/catalog-type", async (req, res) => {
  const data = [
    {
      id: 1,
      code: "Certificaciones",
      enable: true,
      description: "Certificaciones",
      extension: {
        labelName: "Estatus",
        hasExtCode: false,
      },
      createDate: "",
    },
    {
      id: 2,
      code: "Autorizaciones",
      enable: true,
      description: "Autorizaciones",
      extension: {
        labelName: "Estatus",
        hasExtCode: false,
      },
      createDate: "",
    },
    {
      id: 3,
      code: "Estatus de envío",
      enable: true,
      description: "Estatus de envío",
      extension: {
        labelName: "Estatus",
        hasExtCode: false,
      },
      createDate: "",
    },
    {
      id: 4,
      code: "Causas de expiración",
      enable: true,
      description: "Causas de expiración",
      extension: {
        labelName: "Causa",
        hasExtCode: true,
        extCodeName: "ID CNBV",
      },
      createDate: "",
    },
  ];
  res.status(200).json({ statusCode: 200, data: data });
});
let catalogs = [
  {
    id: 1,
    name: "Ejemplo 1",
    catalogTypeId: 1,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    extCode: null,
    createDate: "",
    updateDate: "",
  },
  {
    id: 2,
    name: "Ejemplo 2",
    catalogTypeId: 2,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    extCode: "",
    createDate: null,
    updateDate: "",
  },
  {
    id: 3,
    name: "Ejemplo 3",
    catalogTypeId: 3,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    extCode: "",
    createDate: null,
    updateDate: "",
  },
  {
    id: 4,
    name: "Ejemplo 4",
    catalogTypeId: 1,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    extCode: null,
    createDate: "",
    updateDate: "",
  },
  {
    id: 5,
    name: "Ejemplo 5",
    catalogTypeId: 4,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    extCode: "1239",
    createDate: "",
    updateDate: "",
  },
];
router.get("/catalog", async (req, res) => {
  try {
    const { catalogTypeId } = req.query;
    // Filtrar por catalogTypeId
    const result = catalogs.filter(
      (item) => item.catalogTypeId === Number(catalogTypeId),
    );

    res.json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error interno",
    });
  }
});
router.post("/catalog", (req, res) => {
  try {
    const body = req.body;

    const newCatalog = {
      id: catalogs.length + 1,
      ...body,
      createDate: new Date(),
      updateDate: new Date(),
    };

    catalogs.push(newCatalog);

    res.json({
      statusCode: 201,
      data: newCatalog,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al crear",
    });
  }
});
router.patch("/catalog/:id", (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const index = catalogs.findIndex((c) => c.id === Number(id));

    if (index === -1) {
      return res.status(404).json({
        statusCode: 404,
        message: "Registro no encontrado",
      });
    }

    catalogs[index] = {
      ...catalogs[index],
      ...body,
      updateDate: new Date(),
    };

    res.json({
      statusCode: 201,
      data: catalogs[index],
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar",
    });
  }
});
router.get('/notary', async (req, res) => {
    try {
        const db = getConnection();
        let allNotaries = db.data.notaries || [];

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const federativeEntityId = parseInt(req.query.federativeEntity, 10);

        // Filtrar por estado si se envía el parámetro
        if (federativeEntityId && !isNaN(federativeEntityId)) {
            allNotaries = allNotaries.filter(notary => notary.federativeEntityId === federativeEntityId);
        }

        const totalItems = allNotaries.length;
        const totalPage = Math.ceil(totalItems / limit);

        // Paginación utilizando slice sobre el arreglo
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const details = allNotaries.slice(startIndex, endIndex);

        const data = {
            page: page,
            totalPage: totalPage,
            totalItems: totalItems,
            data: details
        };
        res.json({ statusCode: 200, data: data});
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
})

router.post('/notary/seed', async (req, res) => {
    try {
        const db = getConnection();
        db.data.notaries ||= [];
        
        let currentId = db.data.notaries.length > 0 ? db.data.notaries[db.data.notaries.length - 1].id : 0;
        const newNotaries = [];
        
        for(let i = 0; i < 500; i++) {
            currentId++;
            const randomEntity = entidades[Math.floor(Math.random() * entidades.length)];
            newNotaries.push({
                id: currentId,
                name: faker.person.fullName(),
                enable: Math.random() > 0.2, // 80% de probabilidad de ser true
                federativeEntityId: randomEntity.id,
                federativeEntityName: randomEntity.name,
                createDate: faker.date.past().toISOString(),
                notaryNumber: faker.number.int({ min: 1, max: 999 }),
                updateDate: faker.date.recent().toISOString()
            });
        }
        
        db.data.notaries.push(...newNotaries);
        await db.write();
        
        res.status(201).json({ statusCode: 201, message: '500 notarios generados exitosamente en la BD.', count: newNotaries.length });
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
})

router.post('/notary', async(req,res) => {
    try {
        const db = getConnection();
        db.data.notaries ||= [];
        const notaries = db.data.notaries;
        
        const body = {
            id: notaries.length > 0 ? notaries[notaries.length - 1].id + 1 : 1,
            createDate: new Date().toISOString(),
            updateDate: new Date().toISOString(),
            ...req.body
        };
        
        db.data.notaries.push(body);
        await db.write();
        res.status(201).json({ statusCode: 201, data: body });
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
})

router.patch('/notary/:id', async(req,res) => {
    try {
        const db = getConnection();
        db.data.notaries ||= [];
        const id = parseInt(req.params.id, 10);
        const index = db.data.notaries.findIndex(n => n.id === id);

        if (index !== -1) {
            db.data.notaries[index] = { ...db.data.notaries[index], ...req.body, updateDate: new Date().toISOString() };
            await db.write();
            res.status(200).json({ statusCode: 200, data: db.data.notaries[index] });
        } else {
            res.status(404).json({ statusCode: 404, message: 'Notary not found' });
        }
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
})

export default router;
