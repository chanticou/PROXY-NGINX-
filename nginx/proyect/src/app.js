import express from 'express'

const app = express()
const PORT = process.argv[2] || 8080

app.use(express.static('public'))



const server = app.listen(PORT, ()=>console.log(`Listening on port ${PORT} in process ${process.pid}`))

const child = fork(__dirname + './randomNumber.js')


app.get('/',(req,res)=>{
   res.sendFile('index.html')

})

app.get('/datos',(req,res)=>{
    res.send(`Servidor ${process.pid}`)
 
 })
// app.get('/', (req, res) => {
//     let queryNumber = req.query.cant
//     child.send(queryNumber)
    
//     child.on('message', (childObj)=>{
//         console.log(childObj)
//         res.send(childObj)
//     })
   
// })


