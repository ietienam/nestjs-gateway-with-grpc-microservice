import httpStatus from "http-status";

export const responseHandler = (err: any) => {
  let error = err;

  if (err instanceof Error) {
    if (err.message === `${httpStatus.NOT_FOUND}`) {
      return {
        statusCode: httpStatus.NOT_FOUND,
        message: "Record not found",
        data: {},
      };
    }

    if (err.message === `${httpStatus.BAD_REQUEST}`) {
      return {
        statusCode: httpStatus.BAD_REQUEST,
        message: "Invalid data provided, Please check and try again",
        data: {},
      };
    }

    if (error["code"] && error["code"].toString() === "11000") {
      const statusCode = httpStatus.BAD_REQUEST;
      const regex = /dup key: {\s*([^:]+)\s*:\s*"[^"]+"\s*}/;
      const match = error.message.match(regex);
      const duplicatedFieldKey = match ? match[1] : null;
      const message: string = `${duplicatedFieldKey} already exists`;
      return { statusCode, message, data: {} };
    } else {
      return {
        statusCode: 500,
        message: err.message || "Internal Server Error",
        data: {},
      };
    }
  }

  return { statusCode: 200, message: "success", data: { ...err } };
};
