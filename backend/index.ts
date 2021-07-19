
// PER FAR FUNZIONARE, ESEGUIRE QUESTI COMANDI SU UN NUOVO TERMINALE (`CTRL` + `SHIFT` + `ò`) ⬇⬇⬇

// npm i fastify
// npm i fastify-swagger
// npm i nodemon
// npm i @types/node

// POI, SEMPRE SU UN NUOVO TERMINALE (`CTRL` + `SHIFT` + `ò`) SCRIVERE : ` nodemon . `
// POI, SEMPRE SU UN NUOVO TERMINALE (`CTRL` + `SHIFT` + `ò`) SCRIVERE : ` tsc -w index.ts `

// ORA RIMANE SOLO DA SCRIVERE SULLA BARRA DEGLI INDIRIZZI  ` http://127.0.0.1:3000/api `

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////                                                                                                         //
///  PREMERE `CTRL` + `F` E DIGITARE `###`, QUELLI SONO I CAMPI DA MODIFICARE IN RELAZIONE ALL'ESERCIZIO    ///
//                                                                                                         ////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import fastify from 'fastify'
import * as swagger from 'fastify-swagger'

const app = fastify({
  logger: true,
  ignoreTrailingSlash: true
})

app.register(swagger.default, {
  routePrefix: '/api',
  swagger: {
    info: {
      title: 'Esame ITS 2021',
      description: 'Api Esame',
      version: '1.0.0'
    },
    host: '127.0.0.1:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
})

// CHIAMATA GET PER RICEVERE I DATI
app.get("/meteturistiche", (req, reply) => {
  reply
    .code(200)  
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(
      { 
        name: 'Roma',                  
        positionMaps: 'pos'
      }
    )
})

app.get("/attrazioni", (req, reply) => {
  reply
    .code(200)  
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(
      { 
        name: 'colosseo',              
        city: 'Rome' ,                       
        persone_entrate: '15',       
        persone_uscite: '10',            
        persone_presenti: '5',
        permanenza_media: '10'              //in minuti
      },
    )
})

app.get("/dettaglioattrazione/:id", (req, reply) => {
  reply
    .code(200)  
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(
      { 
        name: 'colosseo',              
        city: 'Rome' ,                       
        persone_entrate: '15',       
        persone_uscite: '10',            
        persone_presenti: '5',
        permanenza_media: '10'              //in minuti
      }
    )
})

// CHIAMATA POST PER INSERIRE I DATI
app.post("/registrazione", {
    schema: { 
      params: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            description: "Inserire nome"
          },
          cognome: {
            type: "string",
            description: "inserire cognome"
          },
          password: {
            type: "string", 
            description: "inserire password"
          }
        }
      } 
    }
  }, (req, reply) => {
    reply
      .code(200)  // => IL CODICE CHE VIENE TORNATO
      .send({
        message: "Data added succesfully!"
      })
  }
)


app.listen(3000, err => {
  if (err) throw err
})
