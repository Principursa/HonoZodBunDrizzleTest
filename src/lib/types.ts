import { PinoLogger } from "hono-pino";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { RouteConfig } from "@hono/zod-openapi";
import { RouteHandler } from "@hono/zod-openapi";
export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

