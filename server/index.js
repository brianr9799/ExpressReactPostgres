const express = require('express')

const app = express()

const path = require('path')

const db = require('./queries')

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


const PORT = 9001

//host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

//Routes
app.get('/', (req, res) => {
    // we'll do some stuff here
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.get('/test', (req, res)=>{
    //do something with the res
    res.status(200).send("/test route")
})
//CRUD

//CREATE - add data to db
app.post('/new', db.createLink)

//READ - get data from db
app.get('/links', db.getLinks)

//UPDATE - update data in db
//app.put('/updates', db.updateLinks)

//DELETE - remove data from db
app.delete('/links/:id', db.deleteLink)

//Starting Express on our PORT
app.listen(PORT,()=>{
    console.log(`The app is running on port ${PORT}.`)
})