/* eslint-disable */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'


const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/', express.static(path.join(__dirname, 'dist')))

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
