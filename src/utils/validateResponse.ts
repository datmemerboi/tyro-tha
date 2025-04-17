import { ZodSchema } from "zod";

export class HTTPError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "HTTPError";
  }
}

export class NotFoundError extends Error {
  constructor(message?: string, public status?: number) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(public issues: string) {
    super(issues);
    this.name = "ValidationError";
  }
}

export async function validateResponse<T>(
  response: Response,
  schema: ZodSchema<T>
): Promise<T> {
  if (response.status === 404) {
    throw new NotFoundError();
  }
  if (!response.ok) {
    let errorMessage = `HTTP error: ${response.status} ${response.statusText}`;

    try {
      const errorJson = await response.clone().json();
      if (errorJson?.error) {
        errorMessage = `API error: ${errorJson.error}`;
      }
    } catch {
      // silently ignore JSON parse failure
    }

    throw new HTTPError(errorMessage, response.status);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (err) {
    throw new HTTPError("Failed to parse JSON response:", err.message);
  }
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new ValidationError(parsed.error.toString());
  }

  return parsed.data;
}
