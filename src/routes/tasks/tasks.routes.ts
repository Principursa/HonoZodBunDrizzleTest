import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "../../utils/http-status-codes";
import jsonContent from "../../middlewares/json-content";
import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "../../db/schema";
import jsonContentRequired from "../../middlewares/json-content-required";
import createErrorSchema from "../../middlewares/create-error-schema";
import IdParamsSchema from "../../middlewares/id-params";
import {notFoundSchema} from "../../lib/constants"
import jsonContentOneOf from "../../middlewares/json-content-one-of";

const tags = ["Tasks"];

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The list of tasks",
    ),
  },
});


export const create = createRoute({
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertTasksSchema,
      "The task to create"

    )
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "The created task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
       createErrorSchema(insertTasksSchema),
      "Validation Error(s)"
    )
  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
  request: {
    params: IdParamsSchema
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
     selectTasksSchema,
      "The requested task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "Invalid ID error"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
  },
});


export const patch = createRoute({
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchTasksSchema,
      "The task updates"
      
    )
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "The created task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchTasksSchema),createErrorSchema(IdParamsSchema),],
      "Validation Error(s)"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not Found"
    )
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Task Deleted"
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id Error"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not Found"
    )
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
