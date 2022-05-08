import { app } from './app'

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))

// TODO graceful server close for scalable application
// in the future is possible implements a health for more accurate control over service
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => console.log('HTTP server closed'))
})
