import * as dotenv from 'dotenv'
dotenv.config()

const evnDependencies: (string | undefined)[] = []

for (const dependency of evnDependencies) {
    if (!dependency) {
        console.error('Enviroment variables for SocketIO admin ui need to be set.')
        process.exit(9) // exit code for required value not given
    }
}

import { createServer } from 'http'
import cors from 'cors'
import app from './app'

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

const server = createServer(app)

server.listen(app.get('port'), () => {
    console.log(`Server Listening on port ${port}`)
})
