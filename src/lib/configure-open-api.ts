import { AppOpenAPI } from "./types";
import packageJSON from "../../package.json";
import {Scalar} from "@scalar/hono-api-reference"
export default function configureOpenAPI(app: AppOpenAPI){
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.verison,
      title: "My API"
    },
  });
  app.get(
    '/scalar',
    Scalar({
        url: 'doc',
      theme: 'kepler',
    })
  )
}
