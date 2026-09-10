const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Someting went wrong while creating Airport";
    ErrorResponse.error = new AppError(['name not found in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.code) {
    ErrorResponse.message = "Someting went wrong while creating Airport";
    ErrorResponse.error = new AppError(['code not found in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId) {
    ErrorResponse.message = "Someting went wrong while creating Airport";
    ErrorResponse.error = new AppError(['cityId not found in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if(!req.body) {
    ErrorResponse.message = "Someting went wrong while updating Airport";
    ErrorResponse.error = new AppError(['No data passed in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.name && !req.body.code && !req.body.cityId && !req.body.address) {
    ErrorResponse.message = "Someting went wrong while updating Airport";
    ErrorResponse.error = new AppError(['name, code, cityId or address not found in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
