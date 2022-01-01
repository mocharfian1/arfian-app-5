const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
app.get('/', (req, res) => res.send('<h2> Moch Arfian Ardiansyah </h2>'));
app.listen(PORT, () => console.log(`Aplikasi berjalan di port : ${PORT}`))