import express, { Application } from "express"
import helmet from 'helmet'
import cors from 'cors'

import { router } from './router'
import { errorHandler } from './handler'

export const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (_, res) => res.json({ name: 'Auth Service' }))
app.use(router)
app.use(errorHandler)