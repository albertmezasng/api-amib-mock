import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');

// Crear la carpeta si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Configuración de Multer (para multipart/form-data)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post('/upload-multer', upload.any(), (req, res) => {
    res.status(200).json({ 
        message: 'File uploaded via multer successfully', 
        files: req.files 
    });
});

// 2. Endpoint para emular S3 pre-signed URL (RAW PUT body como lo manda Angular fetch)
router.put('/upload/:fileId', (req, res) => {
    const { fileId } = req.params;
    const filePath = path.join(uploadDir, fileId);
    
    // Al usar una URL firmada, Angular envía el archivo en el body directo (sin multipart)
    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);
    
    req.on('end', () => {
        res.status(200).json({ message: 'S3 emulation: File uploaded successfully locally' });
    });
    
    writeStream.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
});

router.get('/file/:fileId', (req, res) => {
    const filePath = path.join(uploadDir, req.params.fileId);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    return res.sendFile(filePath);
});

export default router;
