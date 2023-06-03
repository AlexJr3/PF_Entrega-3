import { EErrors } from "../service/error/enums.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EErrors.AUTH_ERROR:
      res.send({ status: "error", error: error.message });
      break;

    case EErrors.DATABASE_ERROR:
      res.send({ status: "error", error: error.message });
      break;

    case EErrors.INVALID_JSON:
      res.send({ status: "error", error: error.message });
      break;

    case EErrors.INVALID_PARAM:
      res.send({ status: "error", error: error.message });
      break;

    case EErrors.ROUTING_ERROR:
      res.send({ status: "error", error: error.message });
      break;

    case EErrors.CREATE_PRODUCTS:
      res.send({ status: "error", error: error.message });
      break;

    case EErrors.CREATE_PRODUCTS:
      res.send({ status: "error", error: error.message });
      break;
    default:
      res.send({
        status: "ok",
        error: "Error inesperado, comuniquese con el area de soporte",
      });
      break;
  }
};
