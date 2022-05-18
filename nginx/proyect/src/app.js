import express from 'express'
import cluster from 'cluster'
import http from 'http'
import os from 'os'

const app = express()
const PORT = process.argv[2] || 8080

app.use(express.static('public'))



const server = app.listen(PORT, () => console.log(`Listening on port ${PORT} in process ${process.pid}`))

//devuelve la cantidad de procesadores lógicos
const numCPUs = os.cpus().length
console.log(numCPUs)




/* INFO */
app.get('/info', (req, res, next) => {
   const datosProcess = {
       directorio: process.cwd(),
       id: process.pid,
       version: process.version,
       titulo: process.title,
       so: process.platform,
       argv: process.argv.slice(1),
       rss: process.memoryUsage().rss,
       ncpus: numCPUs
   }
   console.log(process.argv)
   res.render('infoTable', {datosProcess: datosProcess})
});







if (cluster.isPrimary) {

   console.log(`master ${process.pid} is running`)

   //fork workers, procesos hijos
   for (let i = 0; i < numCPUs; i++) {
      cluster.fork(); //por cada procesador levanto un proceso hijo
   }

   cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker-process.pid} died`);
   })

} else {

   //workers can share any TCP connection, el worker sería como un proceso hijo
   // in this case it is an HHTP Server

   console.log(`worker ${process.pid} started`);
   const server = httpServer.listen(PORT, () => { //escucho al httpserver, quien contiene el express
      server.on("error", error => console.log(`Se detecto un error: ${error}`));
   })
}








const child = fork(__dirname + './randomNumber.js')








app.get('/', (req, res) => {
   res.sendFile('index.html')

})

app.get('/datos', (req, res) => {
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