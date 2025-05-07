import { OpenAPIHono} from "@hono/zod-openapi"
import notFound from "../middlewares/not-found";
import { pinoLogger } from "../middlewares/pino-logger";
import { AppBindings } from "./types";
import defaultHook from "../middlewares/default-hook"


export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,

});
}


export default function createApp() {

  const app = createRouter();
  app.use(pinoLogger())

  app.notFound(notFound)

  return app

}


