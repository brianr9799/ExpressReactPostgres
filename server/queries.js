// Connect to Postgres using the node-postgres package

const POOL = require('pg').Pool

const pool = new POOL({
    user: 'me',
    host: 'localhost',
    database: 'favlinks',
    password: 'drowssap',
    port: 5432
})

//Create all the functions that will be our request handlers in our express server
// Get all the data from db

//Create a new link in the db

const createLink = (request, response) => {
    //take the data the user passes us and insert it into our table
    const name = request.body.name
    const url = request.body.url
   
    pool.query('INSERT INTO links (name, URL) VALUES ($1, $2)', 
    [name, url], 
    (error, results)=>{
        if(error){
            throw error
        }
        response.status(201).send(`Link added with ID: ${results.insertId}`)
    },
  )

}
//Read all the data from db

const getLinks = (req,res) => {
    //get back all the data currently in the database
    pool.query('SELECT * FROM links ORDER BY id ASC',  (error, result)=>{
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}

//Update link in the db

//Delete link in the db

const deleteLink = (req,res) => {
    const id = parseInt(req.params.id)
    
    //console.log(id + ' queries index')
    pool.query('DELETE FROM links (name, url) WHERE id = $1',[id],(error, result)=>{
        if(error){
            throw error
        }
        res.status(200).send(`Link removed with ID: ${id}`)
    })
}

module.exports = {
    createLink,getLinks,deleteLink
}
//console.log(pool)