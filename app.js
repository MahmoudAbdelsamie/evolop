const express = require('express');
const bodyParser = require('body-parser');
const { findEnvelopeIndexById } = require('./helpers');


const PORT = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.param('id', (req, res, next, id) => {
    const envelopeIndex = findEnvelopeIndexById(Number(id), envelopes);
    if(envelopeIndex === -1) {
        return res.status(404).send('Envelope Not Found');
    } else {
        req.envelopeIndex = envelopeIndex;
        next()
    }
})

let id = 1;
let totalBudget = 3000;
let envelopes = [];

app.get('/', (req, res) => {
    res.send('Hello, Evolop')
});

app.post('/envelopes', (req, res) => {
    try {
        const { title, budget } = req.body;
        const envelope = {
            id: id++,
            title: title,
            budget: budget
        };
        envelopes.push(envelope);
        res.status(201).send();
    } catch(error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
});


app.get('/envelopes', (req, res) => {
    res.send(envelopes)
})


app.get('/envelopes/:id', (req, res) => {
    try {
        res.status(200).send(envelopes[req.envelopeIndex]);
    }catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error!')
    }
})

app.put('/envelopes/:id', (req, res) => {
    try {
        const { title, budget } = req.body;
        envelopes[req.envelopeIndex].title = title;
        envelopes[req.envelopeIndex].budget = budget;
        res.status(200).send();
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


app.delete('/envelopes/:id', (req, res) => {
    try {
        envelopes.splice(req.envelopeIndex, 1);   
        res.status(200).send();
    } catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    try {
        const firstEnvelopeIndex = findEnvelopeIndexById(Number(req.params.from), envelopes);
        const secondEnvelopeIndex = findEnvelopeIndexById(Number(req.params.to), envelopes);
        if( firstEnvelopeIndex === -1 || secondEnvelopeIndex === -1 ) {
            return res.status(404).send('One of the Envelopes Not Founded')
        } else {
            const budget = envelopes[firstEnvelopeIndex].budget;
            envelopes[secondEnvelopeIndex].budget = budget;
        }
        res.status(200).send()
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})