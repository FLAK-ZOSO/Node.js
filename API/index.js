const express = require('express');
const app = express();
const PORT = 3000;

wasps = [
    '🐛', '🐝', '🐜',
    '🦂', '🦗', '🦟',
    '🐞', '🦋', '🐌'
];

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
app.post('/wasps/:index', (req, res) => {
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
        wasps[index] = insect;
        res.status(200).send({
            added: `${insect} at index ${index}`,
            insects: wasps,
            size: wasps.length
        });
    }
});