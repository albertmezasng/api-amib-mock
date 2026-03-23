import { Router } from "express";
import { getConnection } from "./database.js";
import { faker, tr } from "@faker-js/faker";

const router = Router();

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
      createDate: "",
    },
    {
      id: 2,
      code: "Autorizaciones",
      enable: true,
      createDate: "",
    },
    {
      id: 3,
      code: "Estatus de envío",
      enable: true,
      createDate: "",
    },
    {
      id: 4,
      code: "Causas de expiración",
      enable: true,
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
    createDate: "",
    updateDate: "",
  },
  {
    id: 2,
    name: "Ejemplo 2",
    catalogTypeId: 2,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    createDate: "",
    updateDate: "",
  },
  {
    id: 3,
    name: "Ejemplo 3",
    catalogTypeId: 3,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    createDate: "",
    updateDate: "",
  },
  {
    id: 4,
    name: "Ejemplo 4",
    catalogTypeId: 1,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
    createDate: "",
    updateDate: "",
  },
  {
    id: 5,
    name: "Ejemplo 5",
    catalogTypeId: 4,
    description: "Este esjnssadh bsahasbhsaksakdasbkh",
    enable: true,
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

    const index = catalogs.findIndex(c => c.id === Number(id));

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
export default router;
