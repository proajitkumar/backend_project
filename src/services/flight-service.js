const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAllFlights(query) {
  // trips = MUM-DEL
  let customFilter = {};
  let sortFilters = [];

  if (query?.trips) {
    let [departureAirportId, arrivalAirportId] = query?.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    // TODO: add a check that they are not same
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query?.price) {
    let [minPrice, maxPrice] = query?.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [
        query.tripDate + " 00:00:00",
        query.tripDate + " 23:59:00",
      ],
    };
  }
  if (query?.sort) {
    let params = query?.sort.split(",");
    const sortFilter = params?.map((param) => param?.split("_"));
    sortFilters = sortFilter;
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilters,
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the Flight",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
