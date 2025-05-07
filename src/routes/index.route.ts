import { createRouter } from "../lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import jsonContent from "../middlewares/json-content";
import * as HttpStatusCodes from "../utils/http-status-codes";
import createMessageObjectSchema from "../middlewares/create-message-object";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Tasks Api"),
        "Tasks API Index",
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Tasks API",
      },
      HttpStatusCodes.OK,
    );
  },
);

export default router;
