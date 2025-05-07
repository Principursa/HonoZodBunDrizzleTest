import type { ZodSchema } from "./zod-types";

import jsonContent from "./json-content.js";

const jsonContentRequired = <
  T extends ZodSchema,
>(schema: T,
  description: string,
) => {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
};

export default jsonContentRequired;
