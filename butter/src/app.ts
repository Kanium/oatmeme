import express, { Application, Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import winston from 'winston'
import { ResponseError } from './models/ResponseError.model'
import * as swaggerUi from 'swagger-ui-express'
import * as YAML from "yamljs"
import path from 'path'

import apiRouter from './router'

// Boot express
const app: Application = express()

if (process.env.NODE_ENV === 'production') {
    const loggerFile = winston.createLogger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './logs/all-logs.log',
                handleExceptions: true,
                maxsize: 5242880, //5MB
                maxFiles: 5
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true
            })
        ],
        exitOnError: false
    })

    app.use(
        logger('common', {
            stream: {
                write: (message) => loggerFile.info(message)
            }
        })
    )
} else {
    app.use(logger('dev'))
}

app.use(express.json())
app.use(
    express.urlencoded({
        extended: false
    })
)

// setup swagger
const swaggerPath = path.join(__dirname, 'public', 'swagger.yaml')
const swaggerJsonPath = path.join(__dirname, 'public', 'swagger.json')
const swaggerDocument = YAML.load(swaggerPath)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/swagger.json', express.static(swaggerJsonPath))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(err.status || 500)
    res.send('Error Occured!\nPlease try again later')
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome To Butter, Oatmemes Backend Service')
})

app.use('/api', apiRouter)

export default app
