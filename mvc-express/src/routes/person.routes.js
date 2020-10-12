import {Router} from 'express';
// Database connection
import {connect} from "../database";
import {ObjectID} from "mongodb";

const router = Router();


router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('person').find({}).toArray();
    // console.log(result);
    // res.send('PERSON');
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const  {id} = req.params;
    const db = await connect();
    const result = await db.collection('person').findOne({_id: ObjectID(id)});
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const person = {
        Nombres: req.body.Nombres,
        DNI: req.body.DNI,
        Celular: req.body.Celular,
        Correo: req.body.Correo
    };
    const result = await db.collection('person').insert(person);
    // res.json(result);
    res.json(result.ops[0]);
});

router.put('/:id', async (req, res) => {
    const db = await connect();
    const  {id} = req.params;
    const personNew = {
        Nombres: req.body.Nombres,
        DNI: req.body.DNI,
        Celular: req.body.Celular,
        Correo: req.body.Correo
    };
   await db.collection('person').updateOne(
        {_id: ObjectID(id)},
        {$set: personNew}
    );
    res.json({
        message: 'Person ' + id + ' Updated'
    });
});

router.delete('/:id', async (req, res) => {
    const  {id} = req.params;
    const db = await connect();
    const result = await db.collection('person').remove({_id: ObjectID(id)});
    res.json({
        message: 'Person ' + id + ' deleted',
        result
    });
});

export default router;