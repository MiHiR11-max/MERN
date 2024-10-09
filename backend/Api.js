const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const students = require('./Schema1');
const cors = require('cors');


mongoose.connect('mongodb+srv://MIHIR:Mihir%40123@mycluster.ucejs.mongodb.net/FristDatabase').then(() => {
    const app = express();
    console.log('connected');

            app.use(express.json());


    app.use(cors());

    app.get('/students', async (req, res) => {
        const data = await students.find();
        console.log(data);
        res.send(data);
    });

    app.get('/students/:_id', async (req, res) => {
        const data = await students.findOne({ _id: req.params._id });
        console.log(data);
        res.send(data);
    });

    app.post('/students', async (req, res) => {
        try {
            const stu = new students(req.body );
            const ans = await stu.save();
            res.status(201).send(ans);  // Sending a 201 Created status
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    });

    app.delete('/students/:_id', async (req, res) => {
        const ans = await students.deleteOne({ _id: req.params._id });
        res.send(ans);
    });

    app.patch('/students/:_id', async (req, res) => {
        const stu = await students.findOne({ _id: req.params._id });
        Object.assign(stu, { ...req.body });
        const ans = await stu.save();
        res.send(ans);
    });





    app.listen(8000, () => {
        console.log("cruising at 8000");
    });
}
)