const express = require('express');
const app = express();
const PORT = 3000;

wasps = new Array(
    '🐛', '🐝', '🐜',
    '🦂', '🦗', '🦟',
    '🐞', '🦋', '🐌'
);

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


app.get('/', (_, res) => {
    res.send('No insects here!');
});
app.get('/wasps', (_, res) => {
    res.status(200).send({
        insects: wasps,
        size: wasps.length
    });
});
app.delete('/wasps', (_, res) => {
    temp = wasps;
    wasps = [];

    res.status(200).send({
        insects: temp,
        size: temp.length
    });
});
app.put('/wasps', (req, res) => {
    const { insects } = req.body;

    if (!insects) {
        // 422: Unprocessable Entity
        res.status(422).send({
            message: 'You must provide an array of insects'
        });
    } else {
        temp = wasps;
        wasps = insects;
        res.status(200).send({
            old: temp,
            insects: wasps,
            size: wasps.length
        });
    }
});
app.post('/wasps', (req, res) => {
    const { insect } = req.body;

    if (!insect) {
        // 422: Unprocessable Entity
        res.status(422).send({
            message: 'You must provide an insect'
        });
    } else {
        wasps.push(insect);
        res.status(200).send({
            added: `${insect} at index ${wasps.length - 1}`,
            insects: wasps,
            size: wasps.length
        });
    }
});
app.patch('/wasps/:index', (req, res) => {
    const { index } = req.params;
    const { insect } = req.body;

    if (!insect) {
        // 422: Unprocessable Entity
        res.status(422).send({
            message: 'You must provide an insect'
        });
    } else if (index >= wasps.length) {
        // 409: Conflict
        res.status(409).send({
            message: `Index ${index} is out of bounds`
        });
    } else {
        temp = wasps[index];
        wasps[index] = insect;
        res.status(200).send({
            old: temp,
            added: `${insect} at index ${index}`,
            insects: wasps,
            size: wasps.length
        });
    }
});
app.get('/wasps/:index', (req, res) => {
    const { index } = req.params;

    if (index >= wasps.length) {
        // 404: Not Found
        res.status(404).send({
            message: `Index ${index} is out of bounds`
        });
    } else {
        res.status(200).send({
            insect: wasps[index]
        });
    }
});
app.delete('/wasps/:index', (req, res) => {
    const { index } = req.params;
    wasp_to_delete = wasps[index];

    if (index >= wasps.length) {
        // 404: Not Found
        res.status(404).send({
            message: `Index ${index} is out of bounds`
        });
    } else {
        wasps.splice(index, 1);
        res.status(200).send({
            deleted: `Insect at index ${index}: ${wasp_to_delete}`,
            insect: wasp_to_delete,
            insects: wasps,
            size: wasps.length
        });
    }
});