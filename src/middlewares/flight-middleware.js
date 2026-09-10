const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { dateTimeHelper } = require("../utils/helper");

function validateCreateRequest(req, res, next) {
  let errors = []
  if (!req.body.flightNumber) {
    errors.push('flightNumber not found in the request');
  }
  if (!req.body.airplaneId) {
    errors.push('airplaneId not found in the request');
  }
  if (!req.body.departureAirportId) {
    errors.push('departureAirportId not found in the request');
  }
  if (!req.body.arrivalAirportId) {
    errors.push('arrivalAirportId not found in the request');
  }
  if (!req.body.arrivalTime) {
    errors.push('arrivalTime not found in the request');
  }
  if (!req.body.departureTime) {
    errors.push('departureTime not found in the request');
  }
  if(req.body.arrivalTime && req.body.departureTime) {
    let validTiming = dateTimeHelper.compareTime(req.body.arrivalTime, req.body.departureTime)
    if(!validTiming){
      errors.push('arrivalTime must be after departureTime time');
    }
  }
  if (!req.body.price) {
    errors.push('price not found in the request');
  }
  if (!req.body.totalSeats) {
    errors.push('totalSeats not found in the request');
  }
  if(errors?.length > 0){
    ErrorResponse.message = "Someting went wrong while creating Flight";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if(!req.body) {
    ErrorResponse.message = "Someting went wrong while updating Flight";
    ErrorResponse.error = new AppError(['No data passed in the request'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
