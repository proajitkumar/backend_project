const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Someting went wrong while creating Airplane";
    ErrorResponse.error = new AppError(['Model number not found in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if(!req.body) {
    ErrorResponse.message = "Someting went wrong while updating Airplane";
    ErrorResponse.error = new AppError(['No data passed in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.capacity && !req.body.modelNumber) {
    ErrorResponse.message = "Someting went wrong while updating Airplane";
    ErrorResponse.error = new AppError(['modelNumber or capacity not found in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
