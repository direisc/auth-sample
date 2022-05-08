import { Router } from "express"
import { authMiddleware } from './middleware'
import { authenticate, welcome } from './handler'

export const router = Router()

// TODO make routes are versioned like /v1/...
// TODO organize router in resource folders
router.post('/authenticate', authenticate)
router.get('/welcome', authMiddleware, welcome)
