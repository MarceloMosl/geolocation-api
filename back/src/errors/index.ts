function conflictError(message: string) {
  return {
    name: "ConflictError",
    message,
    status: 409,
  };
}

function badRequestError(message: string) {
  return {
    name: "BadRequest",
    status: 400,
  };
}

export default {
  conflictError,
  badRequestError
};
