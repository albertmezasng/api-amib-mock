import express from 'express';
import {getConnection} from "./database.js";
const router = express.Router();

router.post('', async (req, res) => {
    try {
        console.log(req)
        const db = getConnection();
        const data = db.data;
        let body={}
        const daysAplication = data.closeDays
        for (let index = 0; index < req.body.day.length; index++) {
            body = {
                id: daysAplication.length + 1,
                day: req.body.day[index],
                modalityId:req.body.modalityId,
                locationsId:req.body.locationsId,
                typeCalendar:req.body.typeCalendar,
            };
            db.data.closeDays.push(body);
            
        }
        await db.write();
      
        res.status(201).json({ statusCode: 201, message: 'Se han agregado cierres de aplicacion correctamente ', closeDays: body });
    } catch(error) {
        return res.status(500).json(error);
    }
});

router.get('/:id', async(req, res) =>{
    const id = parseInt(req.params.id);
    try {
        const db = getConnection();
        const data = db.data;
        const daysCloseAplications = data.closeDays.filter(  day => day.typeCalendar === id);
        res.status(200).json({ statusCode :200, data: [...daysCloseAplications]});
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete('/:id', async(req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const db = getConnection();
        const data = db.data;
        data.closeDays = data.closeDays.filter(day => day.id !== id);
        await db.write();
        res.status(200).json({ statusCode :200, message: 'Elemento eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({  statusCode: 400, message: 'Error al eliminar el elemento', error });
    }
});

router.put('/:id', async(req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const  body = {
          
            day: req.body.day[0],
            modalityId:req.body.modalityId,
            locationsId:req.body.locationsId,
            typeCalendar:req.body.typeCalendar,
        };
        
        const db = getConnection();
        await db.read();
        const index = db.data.closeDays.findIndex(day => day.id === id);
        if (index !== -1) {
            db.data.closeDays[index] = { ...db.data.closeDays[index], ...body };
            await db.write();
            res.status(200).json({ statusCode :200, message: 'Evento actualizado exitosamente', updatedItem: db.data.closeDays[index] });
        } else {
            res.status(404).json({ message: 'Elemento no encontrado' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al actualizar el elemento', error });
    }
})

export default router;