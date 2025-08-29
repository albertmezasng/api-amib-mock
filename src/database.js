import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from "path";
import { fileURLToPath } from "url";
let db;

/** type Institution = {
    id: number;
    name: string;
    institutionTypeId: number;
};

type BusinessLine = {
    id: number;
    name: string;
    institutionId: number
};

type Broker = {
    id: number;
    name: string;
    lastName: string;
    mothersName: string;
    email: string;
    rfc: string;
    cellphone: string;
}

type Data = {
    institutions: Institution[];
    businessLines: BusinessLine[];
    brokers: Broker[];
} */

const __dirname = dirname(fileURLToPath(import.meta.url));
export const connectDB = async () => {
    const defaultData = {
        institutions: [],
        businessLines: [],
        brokers: [],
        documents: [],
        validations: [],
        typeExam: [],
        closeDays:[],
    };
    const file = join(__dirname, '../db.json');
    console.log(file);
    const adapter = new JSONFile(file);
    db = new Low(adapter, JSON.stringify(defaultData));
    console.log(db);
    await db.read();
    db.data ||= defaultData;
    await db.write();
}

export const getConnection = () => db;
