import { Hono } from 'hono'
import app from "./app"
import env from "./env"


var PORT = env.PORT
console.log(`Server is running on port http://localhost:${PORT}`)

export default {
  port: PORT,
  fetch: app.fetch,
}

