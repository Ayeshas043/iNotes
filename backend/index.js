const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
const app = express()
// Use CORS middleware
app.use(cors());


connectToMongo();

const port = 5000
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})