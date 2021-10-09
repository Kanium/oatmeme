import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, `../${process.env.NODE_ENV ?? 'development'}.env`) })

const evnDependencies: string[] = ['MONGO_DATABASE', 'MONGO_USERNAME', 'MONGO_PASSWORD']

for (const dependency of evnDependencies) {
    const exists = process.env[dependency]
    if (!exists) {
        console.error('Enviroment variables for MongoDB need to be set')
        process.exit(9) // exit code for required value not given
    }
}

import { createServer } from 'http'
import cors from 'cors'
import app from './app'
import MongoConnector from './utils/MongoConnector'

const port = process.env.PORT || 5069
app.set('port', port)

const whitelist = ['http://localhost']

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: (origin: any, callback: any) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    preflightContinue: false,
    credentials: true
}

app.use(cors(corsOptions))

MongoConnector.instance.awaitConnection().then(() => {
    const server = createServer(app)
    server.listen(app.get('port'), () => {
        console.log(`Server Listening on port ${port}`)
    })
})
